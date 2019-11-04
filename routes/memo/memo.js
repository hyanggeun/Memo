var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Memo = new Schema({
    name: String,
    content: String,
    date: Date,
    status: String
})

var memoModel = mongoose.model('Memo',Memo);

router.post('/',(req,res)=>{
    console.log(req.body);
    var memo = memoModel.create({
        name: req.body.name,
        content: req.body.content,
        date: req.body.date
    },(err)=>{
        console.error(err);
    })
    res.json({status: "Success"});
})
router.get('/lists',(req,res)=>{
    memoModel.find({},(err,results)=>{
        if(err){
            console.error(err);
            res.status(500).json(err);
        }else{
            for(var i=0;i<results.length;i++){
               // console.log(results);
            }
            res.json(results);
        }
        
    })
})
router.get('/todaylist',(req,res)=>{
    var now_time = new Date();
    //console.log(now_time);
    memoModel.find({},(err,results)=>{
        
        // var chk = results[0].date.getMonth()==now_time.getMonth() && results[0].date.getDate() ==now_time.getDate();
        // console.log(chk)
        // console.log(now_time.getDate());
        // console.log(now_time.getDate())
        // console.log(results[0].date);
        // console.log(results[0].date.getMonth())
        // console.log(results[0].date.getDate());
        if(err){
            console.error(err);
            res.status(500).json(err);
        }else{
            var return_json = [];
            for(var i=0;i<results.length;i++){
                var chk = results[i].date.getMonth()==now_time.getMonth() && results[i].date.getDate()==now_time.getDate();
                if(chk){
                    return_json.push(results[i])
                }
               // console.log(results);
            }
            res.json(return_json);
        }
    })
})
router.get('/tomlist',(req,res)=>{
    var now_time = new Date();
    console.log(now_time);
    memoModel.find({},(err,results)=>{
        if(err){
            console.error(err);
            res.status(500).json(err);
        }else{
            var return_json = [];
            for(var i=0;i<results.length;i++){
                var chk = results[i].date.getMonth()==now_time.getMonth() && results[i].date.getDate()==(now_time.getDate()+1);
                //console.log(chk);
                if(chk){
                    return_json.push(results[i])
                }
               // console.log(results);
            }
            res.json(return_json);
        }
    })
})
module.exports=router;