const express = require('express')
const { google } = require('googleapis')
const User = require('./model')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const svgCaptcha = require('svg-captcha')
const session = require('express-session')
const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/views'))
app.use(session({
    secret: 'captcha-test',
    resave: false,
    saveUninitialized: false,
}))

app.all('/', function (request, response) {
    response.render('login')
})

app.all('/logout', function (request, response) {
    response.redirect('/')
})

//เงื่อนไขหน้า login ว่ามีการเข้ารหัสถูกต้องหรือไม่
app.all('/login', async function (request, response) {

    let Login = request.query.Login;
    let Passwordlogin = request.query.Passwordlogin;

    // เชื่อมต่อ Google Sheet
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: " https://www.googleapis.com/auth/spreadsheets",

    })
    const client = auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "15IW-DqCfTUYrcylSBpqmGtVay4W2PKkwFWhW8_IyM68";

    //รอเก็บข้อมูลรายชื่อจาก Googlesheet
    const getUser_Sheet = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "ชีต1!I2:I",
        majorDimension: "ROWS"
    });

    const getPass_Sheet = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "ชีต1!J2:J",
        majorDimension: "ROWS"
    });

    var getUser = getUser_Sheet.data.values.join().split(",")
    var getPass = getPass_Sheet.data.values.join().split(",")
    var checkUser = getUser.includes(Login)
    var checkPass = getPass.includes(Passwordlogin)

    if (checkUser == true && checkPass == true) {
        response.redirect('/home')
        console.log("Suscess")
    }
    else if (checkUser == true && checkPass == false) {
        response.render('login', { result_login: "รหัสไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง" })
        console.log("Pass Error")
    }
    else if (checkUser == false && checkPass == true) {
        response.render('login', { result_login: "ชื่อผูใข้ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง" })
        console.log("User Error")
    }
    else {
        response.render('login', { result_login: "ไม่พบบัญชีผู้ใช้ กรุณาสมัครสมาชิก" })
        console.log("User and Pass Error")
    }
    /* สำหรับเชื่อมต่อกับ mongoose
      User.find()
         .select('Username Password')
         .exec((err, docs) => {
             for (d of docs) {
                 if (d.Username == Login && d.Password == Passwordlogin) {
                     response.redirect('/home')
                     console.log("true")
                     var checklogin = 1;
                 }
                 else if (d.Username != Login && d.Password == Passwordlogin) {
                     response.render('login', { result_login: User_fail })
                     console.log("User Error")
                     var checklogin = 1;
                 }
                 else if (d.Username == Login && d.Password != Passwordlogin) {
                     response.render('login', { result_login: pass_fail })
                     console.log("Pass Error")
                     var checklogin = 1;
                 }
             }
 
             if (checklogin != 1) {
                 response.render('login', { result_login: fail })
                 console.log("User and Pass Error")
             }
         })*/
})

app.all('/home', function (request, response) {
    response.render('home')
})

// หน้าสำหรับสมัครลงชื่อเข้าใช้งาน
app.all('/signin', async (request, response) => {

    if (!request.body.Firstname) {
        response.render('signin')

    } else {
        let form = request.body
        let data = {
            title: form.title,
            Firstname: form.Firstname,
            Lastname: form.Lastname,
            Nation: form.Nation,
            Username: form.Username,
            Password: form.Password,
            Date: form.Date,
            Gentle: form.Gentle,
            Phone: form.Phone,
            Email: form.Email
        }
        Comfirmpassword = request.body.Comfirmpassword

        if (data.Password == Comfirmpassword) {
            // เพิ่มข้อมูลผ่าน Mongoose
            User.create(data)

            //เพิ่มข้อมูลผ่าน Google Sheet
            const auth = new google.auth.GoogleAuth({
                keyFile: "credentials.json",
                scopes: " https://www.googleapis.com/auth/spreadsheets",

            })
            const client = auth.getClient();
            const googleSheets = google.sheets({ version: "v4", auth: client });
            const spreadsheetId = "15IW-DqCfTUYrcylSBpqmGtVay4W2PKkwFWhW8_IyM68";

            googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "ชีต1!A:K",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [
                        [data.Date,
                        data.title,
                        data.Firstname,
                        data.Lastname,
                        data.Nation,
                        data.Gentle,
                        data.Phone,
                        data.Email,
                        data.Username,
                        data.Password,]
                    ],
                },
            });        
            response.render('login')
        }
        else {
            response.render('signin')
        }
    }
})

// หน้าค้นหาข้อมูลผู้ใช้ทั้งหมดผ่าน Mongoose
app.all('/find', (request, response) => {
    var find_fail = "ไม่พบบัญชี หากลืมรหัสผ่านกรุณาติดต่อเจ้าหน้าที่"
    let Login_find = request.query.Login_find;
    let Passwordlogin_find = request.query.Passwordlogin_find;

    if (Login_find == "Saowaporn" && Passwordlogin_find == "55555") {
        var findcheck = 1
        User.find()
            .exec((err, docs) => {
                response.render('find', {
                    data: docs
                })
            })
    }
    else if (findcheck != 1) {
        response.render('login', { result_find: find_fail })
    }
})

// อักษรที่ปรากฏในหน้าตรวจสอบอักษร
app.get('/captcha-image', (request, response) => {
    let captcha = svgCaptcha.create({ size: 5, noise: 3, background: '#def' })
    request.session.captcha = captcha.text
    response.type('svg')
    response.status(200) // everything is ok
    response.send(captcha.data) // ส่งข้อมูลของ chptcha
})

//หน้ายืนยันตัวตนว่าไม่ใช่ bot ผ่านการพิมพ์อักษรให้ตรงกับรูปภาพ
app.all('/check', (request, response) => {
    if (!request.body.captcha) {
        response.render('former')       // ถ้าไม่มีข้อมูลกให้อยู่ในรูปแบบ form (รูปแบบเริ่มต้น)
    } else {
        let sessCaptcha = request.session.captcha // ข้อมูลจากใน session ที่สุ่มมาจาก captcha
        let postCaptcha = request.body.captcha // ข้อมูลจาก body ที่มีชื่อว่า chatcha ซึ่งอยู่ในไฟล์ form.ejs
        var r = 'คุณใส่อักขระไม่ตรงกับในภาพ'

        if (sessCaptcha == postCaptcha) {
            response.redirect('/resetpassword')
        }
        else if (sessCaptcha != postCaptcha) {
            response.render('former', { result: r })
        }
    }
})

//หน้าเเก้ไขข้อมูลผ่านการเช็คอีเมลเพื่อทำการเเก้้ไขข้อมูล
app.all('/resetpassword', (request, response) => {
    if (request.method == 'GET') {
        response.render('resetpassword')
    }
    else if (request.method == 'POST') {
        var reset_fail = "ไม่พบปัญชีผู้ใช้"
        let Email_Reset = request.body.EmailReset || '';
        User.find()
            .select('Email')
            .exec((err, docs) => {
                for (e of docs) {
                    if (e.Email == Email_Reset) {
                        response.redirect('/edit/' + e._id)
                        var x = 1
                    }
                }
                if (x != 1) {
                    console.log("error")
                    response.render('resetpassword', { result_reset: reset_fail })
                }
            }
            )
    }
})

// หน้าการเเก้ไขข้อมูลส่วนตัวทั้งหมด + รหัสผ่าน
app.all('/edit/:id', async (request, response) => {
    if (request.method == 'GET') {
        if (request.params.id) {
            User
                .findById(request.params.id)
                .exec((err, doc) => {
                    response.render('edit', { data: doc })
                })
        } else {
            response.render('find')
        }
    } else if (request.method == 'POST') {
        let form = request.body
        let data = {
            title: form.title,
            Firstname: form.Firstname,
            Lastname: form.Lastname,
            Nation: form.Nation,
            Username: form.Username,
            Password: form.Password,
            Date: form.Date,
            Gentle: form.Gentle,
            Phone: form.Phone,
            Email: form.Email
        }
        Comfirmpassword = request.body.Comfirmpassword

        if (data.Password == Comfirmpassword) {
            // เเก้ไขข้อมูลผ่าน Google Sheet
            const auth = new google.auth.GoogleAuth({
                keyFile: "credentials.json",
                scopes: " https://www.googleapis.com/auth/spreadsheets",

            })
            const client = auth.getClient();
            const googleSheets = google.sheets({ version: "v4", auth: client });
            const spreadsheetId = "15IW-DqCfTUYrcylSBpqmGtVay4W2PKkwFWhW8_IyM68";
            const getRows = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: "ชีต1!H2:H",
                majorDimension: "ROWS"
            });

            var getData = getRows.data.values.join().split(",")
            var Checkmail = getData.includes(data.Email)
            var checkindex = getData.indexOf(data.Email)

            if (Checkmail == true) {
                googleSheets.spreadsheets.batchUpdate({
                    auth,
                    spreadsheetId,
                    resource: {
                        requests: [
                            {
                                deleteDimension: {
                                    range: {
                                        sheetId: 0,
                                        dimension: "ROWS",
                                        startIndex: checkindex + 1,
                                        endIndex: checkindex + 2
                                    }
                                }
                            }
                        ]
                    }
                });
                googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "ชีต1!A:K",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [
                            [data.Date,
                            data.title,
                            data.Firstname,
                            data.Lastname,
                            data.Nation,
                            data.Gentle,
                            data.Phone,
                            data.Email,
                            data.Username,
                            data.Password,]
                        ],
                    },
                });

                // เเก้ไขข้อมูลผ่าน mongoose
                User
                    .findByIdAndUpdate(request.params.id, data, { useFindAndModify: false })
                    .exec(err => {
                        response.redirect('/')
                    })
                console.log("Success!!")
            }
        }
        else {
            User
                .findById(request.params.id)
                .exec((err, doc) => {
                    response.render('edit', { data: doc })
                })
        }
    }
})

//หน้าลบข้อมูล User ออก
app.get('/delete/:id', (request, response) => {
    if (request.params.id) {
        User
            .findByIdAndDelete(request.params.id, { useFindAndModify: false })
            .exec(err => {
                response.redirect('/find2')
            })
    }
})

// หน้าสำหรับเเสดงผลหลังจากลบข้อมูล
app.all('/find2', (request, response) => {

    User.find()
        .exec((err, docs) => {
            response.render('find', {
                data: docs
            })
        })
})

app.listen(3000, () => console.log('Server started on port: 3000'))