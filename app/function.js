/* jshint strict: true */
/* jshint jquery: true */
/* jshint node: true */
/* jshint esversion: 6 */
/* jshint browser: true */
"use strict";

const {remote} = require('electron').remote;
const {clipboard} = require('electron').remote;
//var Datastore = require('nedb');
var database;

$(document).ready(function() {
    $('.modal').modal();
    $('.collapsible').collapsible({
        onOpen: function(el) {
        $(el).find('.arrow').html('keyboard_arrow_up');}, // Callback for Collapsible open
        onClose: function(el) {
            //reset element
            $(el).siblings().find('input').prop('readonly',true);
            $(el).find('.copyPaste i').html('content_copy');
            var edit = $(el).find('.edit');
            edit.show();
            edit.siblings().hide();
            //set down arrow
            $(el).find('.arrow').html('keyboard_arrow_down');
        }
    });
    $(".button-collapse").sideNav();
    $('.carousel').carousel();
    $('.close-search').hide();
});


$('.tabs').tabs({ 'swipeable': true });

//=========== searchbar ================

$('#search').focus(function(){
    $('.button-collapse').hide();
    $('.close-search').show();
});

$('#search').blur(function(){
    $('.button-collapse').show();
    $('.close-search').hide();
});

$('#search').change(function(){
    var value=$(this).val();
    if(value.length>0) {
        $('.brand-logo').hide();
    }else{
        $('.brand-logo').show();
    }
});

//=========== login ==============

const focusOut = function focusOut(){
    $("#lock").removeClass("red-text");
    $("#password").removeClass("valid");
}

function checkLogin(){
    if($("#password").val() == "1234"){
        $("#lock").addClass("green-text");
        $("#lock").html("lock_open");
        $("#password").addClass("valid");
        $("#login").animate({top: "-=150", opacity: 0}, 500);
        $("#login").closest('.overlay').fadeOut(500);
        $("#database").fadeIn();

        //set database, load
        //database = new Datastore({filename: 'app/db/pwd.db', autoload: true});

        return false;
    }else{
        $("#password").val('');
        $("#lock").addClass("red-text");
        $("#lock").effect("shake", {distance:5});
        $("#password").addClass("invalid");
        return false;
    }
}

//============== database =================

$(".collection-item").hover(
    function(event){
        $(this).children('.secondary-content').show();
    },function(event){
        $(this).children('.secondary-content').hide();
});

$('.eye i').click(function(){
    if($(this).hasClass('fa-eye')){
        $(this).removeClass('fa-eye');
        $(this).addClass('fa-eye-slash');
        $(this).closest('form').find('.password').prop('type',"text");
    } else {
        $(this).removeClass('fa-eye-slash');
        $(this).addClass('fa-eye');
        $(this).closest('form').find('.password').prop('type',"password");
    }
});

$('.password').on('input', function(){
    var pswrdLength = $(this).val().length;
    //percentage later using regex to check security, also check against databse
    var percentage = pswrdLength*100/15;
    if(percentage>100){ percentage = 100; }
    //icon
    var icon = $(this).closest('li').find('.security');
    icon.removeClass('green-text orange-text red-text');
    //progressbar
    var progressbar = $(this).closest('li').find('.determinate');
    progressbar.removeClass('green orange red');

    if(percentage < 30) {
        progressbar.addClass('red');
        progressbar.animate({ width: percentage+"%" },100);
        icon.addClass('red-text');
        icon.html('report');
    }else if(30 < percentage && percentage < 65){
        progressbar.addClass('orange');
        progressbar.animate({ width: percentage+"%" },100);
        icon.addClass('orange-text');
        icon.html('warning');
    }else{
        progressbar.addClass('green');
        progressbar.animate({ width: percentage+"%" },100);
        icon.addClass('green-text');
        icon.html('verified_user');
    }
});

$(".copyPaste").click(function(){
    if($(this).children('i').html() == 'content_copy'){
        var pass = $(this).closest('form').find('.password').val();
        clipboard.writeText(pass);
    }else{
        $(this).closest('form').find('.password').val(clipboard.readText());
    }
});

$('.edit').click(function(){
    $(this).closest('form').find('input').prop('readonly',false);
    $(this).closest('form').find('.copyPaste i').html('content_paste');
    $(this).hide();
    $(this).siblings().show();
});

$('.cancel, .save').click(function(){
    var user = $(this).closest('form').find('.password').val();
    var url = $(this).closest('form').find('.url').val();
    var password = $(this).closest('form').find('.email').val();
    var id = id();

    if($(this).hasClass('save')){
        //update if exists else create entry
        //save in plaintext just for testing, later encrypt
        database.update({_id: id},{user: user, url: url, password: password},
            {upsert: true}); //insert if doesn't exist
    } else {
        //load data from database and apply to form
        database.find({user: user}, function(err, docs){
            user.html(docs[0].user);
        });
    }

    //set form to readonly
    $(this).closest('form').find('input').prop('readonly',true);
    $(this).closest('form').find('.copyPaste i').html('content_copy');
    $(this).hide();
    $(this).siblings().hide();
    $(this).siblings('.edit').show();

});
