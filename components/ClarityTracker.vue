<!-- components/ClarityTracker.vue -->
<template>
  <view style="display: none;"></view>
</template>

<script>
export default {
  name: 'ClarityTracker',
  props: {
    enabled: {
      type: Boolean,
      default: true
    },
    clarityId: {
      type: String,
      default: 'n11jsnn4nv'
    }
  },
  data() {
    return {
      isInitialized: false
    }
  },
  watch: {
    enabled: {
      handler(newVal) {
        if (newVal && !this.isInitialized) {
          this.initClarity();
        }
      },
      immediate: true
    }
  },
  methods: {
    initClarity() {
      // #ifdef H5
      if (this.isInitialized) return;
      
      try {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${this.clarityId}");
        `;
        
        document.head.appendChild(script);
        this.isInitialized = true;
        
        // 可选：添加错误处理
        script.onerror = (error) => {
          console.error('Clarity script loading failed:', error);
          this.isInitialized = false;
        };
        
      } catch (error) {
        console.error('Clarity initialization failed:', error);
        this.isInitialized = false;
      }
      // #endif
    }
  }
}
</script>