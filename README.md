# peter-work


使用技術
FrontEnd
- Nuxt3
- Element plus
- Pinia
- day.js

backEnd
- MongoDB
- Express


啟動步驟
- install MongoDB Compass

https://www.mongodb.com/try/download/compass

- MongoDB import JSON 資料庫匯入資料名稱需與圖片一樣
  - company-system.customers.json
  - company-system.orders.json
  - company-system.products.json
  - company-system.users.json

![image](https://github.com/c-y-s-s/peter-work/assets/89208310/5a5e90ba-5c74-4ac2-95c3-eedfaa2bc911)


admin
```
cd cake-admin

pnpm install

pnpm dev
```

資料夾結構
```
src
├── app.vue
├── components
│   └── cakeNav.vue // 導覽列 / 登入,註冊，等...
├── layouts
│   └── default.vue // 
├── middleware
│   └── auth.ts // 中間鍵 防止未登入者進入特定頁面
├── pages
│   ├── index.vue 首頁
│   ├── login.vue 登入頁
│   ├── order-manage.vue 訂單管理
│   └── product-manage.vue 產品管理
├── server
│   └── apis
│       ├── login.ts 登入 api
│       ├── order.ts 訂單 api
│       ├── product.ts 產品 api
│       └── validate.ts 驗證 token api
├── service
│   └── index.ts api 攔截器
├── store
│   ├── login.ts 登入的一些邏輯
│   └── product.ts 商品管理的一些邏輯
```



cake-front-end 啟動步驟 
```
cd cake-front-end

pnpm install

pnpm dev

```

```
src
├── app.vue
├── assets 放圖片的資料夾
├── components
│   ├── cakeIndex.vue 首頁
│   └── cakeNav.vue 導覽列
├── middleware
│   └── auth.ts // 中間鍵 防止未登入者進入特定頁面
├── pages
│   ├── index.vue 首頁 路口頁 -> 樣式在 cakeIndex
│   ├── member-order.vue 會員訂單查看
│   └── shopping-cart.vue 購物車
├── server
│   └── apis
│       ├── login.ts 登入 api
│       ├── order.ts 訂單 api
│       └── product.ts 商品 api
├── service
│   └── index.ts api 攔截器
├── store
│   └── login.ts 登入的邏輯
```


server
```
cd server

npm install

npm run start

```

資料夾結構
```
├── bin
├── config // 連接資料庫
├── controllers
│   ├── admin 後台控制 在裡面會進行回傳給前端的邏輯
│   └── web 前台控制
├── public 
      ├──  avataruploads 存前端傳過來的圖片
├── routes
│   ├── admin 後台 api 路由
│   └── web 前台 api 路由
├── services
│   ├── admin 後台 進行 撈資料庫資料的地方
│   └── web 前台 撈資料的地方
├── uploads
├── utils
      ├── JWT.js // token 驗證
└── views
```