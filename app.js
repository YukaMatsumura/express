//1.必要なライブラリーをロード
var createError = require('http-errors');//HTTPエラー対処を行うもの
var express = require('express');//express本体
var path = require('path');//ファイルパスを扱う
var cookieParser = require('cookie-parser');//クッキーのパース(値の変換)
var logger = require('morgan');//HTTPリクエストのログ出力に関するもの

//2.ルート用モジュールのロード
var indexRouter = require('./routes/index');//このpathにアクセスがあったときにindex.jsをロードする
var usersRouter = require('./routes/users');//このpathにアクセスがあったときにusers.jsをロードする
var helloRouter = require('./routes/hello');//このpathにアクセスがあったときにhello.jsをロードする
var notesRouter = require('./routes/notes');//このpathにアクセスがあったときにnotes.jsをロードする

//3.Express オブジェクトの作成と基本設定
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');//テンプレートエンジンの設定も行っている

//4.関数の読み込み（1.でロードしたモジュールの機能を呼び出せるようにしたものapp.useで関数を設定）
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//4
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//5.ルート用、エラー用のapp.use
app.use('/', indexRouter);//(ルート)
app.use('/users', usersRouter);//users用
app.use('/hello', helloRouter);//hello用
app.use('/notes', notesRouter);//notes用

// catch 404 and forward to error handler(ページが無かったときの処理)
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//6.module.exportsの設定
module.exports = app;//-最後にexpressにappオブジェクトを設定
