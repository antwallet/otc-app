// ShakeDetector.js
const createShakeDetector = () => {
	// 状态追踪
	const state = {
		lastX: 0,
		lastY: 0,
		lastZ: 0,
		lastTime: 0,
		isShaking: false, // 是否在摇动状态
		shakeCount: 0, // 当前摇动序列中的计数
		lastShakeTime: 0 // 上次触发摇动的时间
	};

	// 配置参数
	const config = {
		shakeThreshold: 150, // 开始摇动的阈值
		minThreshold: 30, // 最小活动阈值
		timeThreshold: 75, // 连续摇动的时间窗口(ms)
		requiredShakes: 2, // 触发所需的连续摇动次数
		cooldownTime: 300 // 触发后的冷却时间(ms)
	};

	// 回调函数
	let onShake = null;

	// 更新最后的传感器值
	const _updateLastValues = (x, y, z, time) => {
		state.lastX = x;
		state.lastY = y;
		state.lastZ = z;
		state.lastTime = time;
	};

	// 重置摇动状态
	const _resetShakeState = () => {
		state.isShaking = false;
		state.shakeCount = 0;
	};

	// 触发摇动事件
	const _triggerShake = () => {
		if (onShake) {
			onShake();
		}

		// 更新状态
		state.lastShakeTime = Date.now();
		_resetShakeState();
	};

	// 处理加速度数据
	const handleAcceleration = (x, y, z) => {
		const currentTime = Date.now();

		// 首次调用，初始化数据
		if (state.lastTime === 0) {
			_updateLastValues(x, y, z, currentTime);
			return;
		}

		// 计算时间差
		const timeDiff = currentTime - state.lastTime;
		if (timeDiff === 0) return; // 防止除零

		// 计算加速度变化（考虑时间因素）
		const deltaX = Math.abs(state.lastX - x);
		const deltaY = Math.abs(state.lastY - y);
		const deltaZ = Math.abs(state.lastZ - z);
		const delta = (deltaX + deltaY + deltaZ) * (1000 / timeDiff); // 标准化到每秒

		// 检查是否在冷却期
		if (currentTime - state.lastShakeTime < config.cooldownTime) {
			_updateLastValues(x, y, z, currentTime);
			return;
		}

		// 主要的摇动检测逻辑
		if (delta > config.shakeThreshold) {
			// 开始新的摇动序列或继续当前序列
			if (!state.isShaking) {
				// 开始新的摇动序列
				state.isShaking = true;
				state.shakeCount = 1;
			} else if (timeDiff < config.timeThreshold) {
				// 在时间窗口内继续摇动
				state.shakeCount++;

				// 检查是否达到触发条件
				if (state.shakeCount >= config.requiredShakes) {
					_triggerShake();
				}
			}
		} else if (delta < config.minThreshold) {
			// 动作幅度太小，重置摇动状态
			_resetShakeState();
		}
		// 在 minThreshold 和 shakeThreshold 之间保持当前状态

		// 更新最后的值
		_updateLastValues(x, y, z, currentTime);
	};

	// 设置回调函数
	const setOnShake = (callback) => {
		onShake = callback;
	};

	// 更新配置
	const updateConfig = (newConfig) => {
		Object.assign(config, newConfig);
	};

	// 获取当前状态（用于调试）
	const getState = () => ({
		...state,
		delta: state.lastDelta
	});

	return {
		handleAcceleration,
		setOnShake,
		updateConfig,
		getState
	};
};

export default createShakeDetector;