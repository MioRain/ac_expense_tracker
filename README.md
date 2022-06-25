# 我的私房記帳本

極簡記帳app

<img src="public/images/001.png" alt="drawing" width="300px"/>
<img src="public/images/002.png" alt="drawing" width="300px"/>
<img src="public/images/003.png" alt="drawing" width="300px"/>

## 功能說明

1. 可以註冊帳號。
2. 支援FB帳號登入。
3. 首頁可以瀏覽所有記錄。
4. 首頁可以瀏覽支出總金額。
5. 可以新增一筆記錄。
6. 可以編輯一筆記錄。
7. 可以刪除一筆記錄。
8. 可以篩選屬性類別。

## 環境建置
- Visual Studio Code
- Node.js + Express(4.18.1)
- Express-handlebars(6.0.6)
- Mongoose(6.4.0)
- passport(0.4.1) + passport-facebook(3.0.0)

## 安裝與執行步驟
1. 使用終端機(Terminal)下載此專案
```
git clone https://github.com/MioRain/ac_expense_tracker.git
```
2. 進入專案資料夾並載入相關套件
```
cd ac_expense_tracker & npm install
```
2. 根據 .env.example 創建 .env 檔案並替換內容
MONGODB_URI = mongodb+srv://`id:password`@cluster0.un1ij.mongodb.net/restaurant-list?retryWrites=true&w=majority

3. 輸入種子資料
```
npm run seed
```

4. 啟動伺服器
```
npm run dev
```
5. 當出現以下畫面，即可於瀏覽器網址內輸入 `http://localhost:3000` 進入首頁囉！
```
The Express server is running on http://localhost:3000
MongoDB connected!
```

測試用帳號密碼
```
email:user1@example.com
password:12345678
```
```
email:user2@example.com
password:12345678
```