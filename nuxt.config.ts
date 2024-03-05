// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
   modules: [
      '@pinia/nuxt',
      'nuxt3-leaflet',
      // '@nuxtjs/proxy'
    ],
   //  proxy: {
   //    '/api/': { target: 'https://api.homeenger.com/', pathRewrite: {'^/api/': ''}, changeOrigin: true }
   //  },
   css:[
        '@/assets/css/main.css',
        '@/assets/css/bootstrap.min.css',
        '@/assets/css/alertify.rtl.min.css',
        '@/assets/css/map.css',
        '@/assets/css/style.css',
        '@/assets/css/icon-bootstrap.css',
        '@/assets/css/font-awasom.css',
        '@/assets/css/single_page.css',
   ],
   runtimeConfig: {
      public: {
         BaseUrl: process.env.BASE_URL,
         Limit: process.env.LIMIT,
         homeUrl: process.env.Home_URL,
      }
   },
   devtools: { enabled: false },
   app:{
      head: {
         meta: [
            { 'http-equiv': 'pragma', content: 'no-cache' },
            { 'http-equiv': 'cache-control', content: 'no-cache' },
            { 'http-equiv': 'expires', content: '0' },
            { content: 'telephone=no', name: 'format-detection' }
         ],
         script:[
            {type:"text/javascript",body:true ,src: '/js/jquery.js'},
            {type:"text/javascript",body:true ,src: '/js/map.js'},
            {type:"text/javascript",body:true ,src: '/js/index.js'},
            {type:"text/javascript",body:true ,src: '/js/bootstrap.min.js'},
            {type:"text/javascript",body:true ,src: '/js/font-awasom.js'},
            {type:"text/javascript",body:true ,src: '/js/sidemenue.js'},

          ]
      }
   },
   ssr:true
    
})
