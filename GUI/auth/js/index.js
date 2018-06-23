jQuery(document).ready(function($){
  var $form_modal = $('.user-modal'),
    $form_login = $form_modal.find('#login'),
    $form_signup = $form_modal.find('#signup'),
    $form_info = $form_modal.find('#info'),
    $form_forgot_password = $form_modal.find('#reset-password'),
    $form_modal_tab = $('.switcher'),
    $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
    $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
    $forgot_password_link = $form_login.find('.form-bottom-message a'),
    $back_to_login_link = $form_forgot_password.find('.form-bottom-message a'),
    $title = $('title')
  //show the selected form
  if ($(location).attr('hash') == "#signup"){
    signup_selected();
  }else if ($(location).attr('hash') == "#info"){
    info_selected();
  }else{
    login_selected();
  }
  // ( $(location).attr('hash') == "#signup" ) ? signup_selected() : login_selected();

  //switch from a tab to another
  $form_modal_tab.on('click', function(event) {
    event.preventDefault();
    ( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
  });

  //hide or show password
  $('.hide-password').on('click', function(){
    var $this= $(this),
      $password_field = $this.prev('input');
    
    ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
    ( 'Hiện' == $this.text() ) ? $this.text('Ẩn') : $this.text('Hiện');
    //focus and move cursor to the end of input field
    $password_field.putCursorAtEnd();
  });

  //show forgot-password form 
  $forgot_password_link.on('click', function(event){
    event.preventDefault();
    forgot_password_selected();
  });

  //back to login from the forgot-password form
  $back_to_login_link.on('click', function(event){
    event.preventDefault();
    login_selected();
  });

  function login_selected(){
    $form_login.addClass('is-selected');
    $form_signup.removeClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $form_info.addClass('hidden');
    $form_modal_tab.removeClass('hidden');
    $tab_login.addClass('selected');
    $tab_signup.removeClass('selected');
    $title.text('Đăng nhập');
  }

  function signup_selected(){
    $form_login.removeClass('is-selected');
    $form_signup.addClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $form_info.addClass('hidden');
    $form_modal_tab.removeClass('hidden');
    $tab_login.removeClass('selected');
    $tab_signup.addClass('selected');
    $title.text('Tạo tài khoản');
  }

  function forgot_password_selected(){
    $form_login.removeClass('is-selected');
    $form_signup.removeClass('is-selected');
    $form_forgot_password.addClass('is-selected');
    $form_modal_tab.removeClass('hidden');
    $form_info.addClass('hidden');
    $title.text('Khôi phục mật khẩu');
  }

  function info_selected(){
    $form_modal_tab.addClass('hidden');
    $form_info.removeClass('hidden');
    $title.text('Cập nhật thông tin');
  }

  //REMOVE THIS - it's just to show error messages 
  $form_modal.find('input[type="submit"]').on('click', function(event){
    event.preventDefault();
    window.location.href = '../index_auth.html';
    // $form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
  });
  // $form_signup.find('input[type="submit"]').on('click', function(event){
  //   event.preventDefault();
  //   window.location.href = '../index_auth.html';
  //   // $form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
  // });

});