// ;(function($, window, document) {
//
// var form = {
//   defaults: {
//
//   },
//   init(opts) {
//     this.$forms = $('form');
//
//     if( !this.$forms.length ) {
//       return false;
//     }
//
//     this._ = {};
//     this._options = jQuery.extend(this.defaults, opts);
//
//     debug('form.init', this);
//
//     this.$forms.each(function(i, el) {
//       this.initForm(el);
//     }.bind(this));
//   },
//   initForm(el) {
//     var $el = $(el),
//       uniqueId = new Date().getTime().toString();
//
//     // Keep backwards compatibility
//     var disallowForms = ['form__sms', 'app__form__form'];
//     if(disallowForms.indexOf(el.id) !== -1) {
//       return;
//     }
//
//     debug('form.initForm', $el);
//
//     $el.attr('novalidate', true);
//     $el.data('form-id', uniqueId);
//     $el.attr('data-form-id', $el.data('form-id'));
//     this.loadRecaptcha(el);
//     this.initInputMasks(el);
//     this.initSelectChange(el);
//     this.initConditionals(el);
//     $el.on('submit', this.onFormSubmit.bind(this));
//     $('input,select,textarea', $el).on('blur', this.onFieldBlur.bind(this));
//   },
//   onFormSubmit(evt) {
//     debug('form.onFormSubmit', evt);
//
//     // Define form
//     var form = evt.currentTarget,
//       $form = $(form),
//       valid = this.validateForm(form);
//
//     // Reset Errors
//     this.resetErrors($form);
//
//     // If validation is success
//     if(valid.success) {
//       debug('form.onFormSubmit: Validation Success');
//
//       // if (evt.originalEvent === undefined) {
//       //   debug('form.onFormSubmit: Success', evt);
//       //   return;
//       // }
//
//       if(this.reCaptchaSubmit(form)) {
//         // Prevent form submission since captcha callback will be used
//         evt.preventDefault();
//         // $form.submit();
//       }
//     } else {
//       evt.preventDefault();
//       if(valid.fields && valid.fields.length) {
//         $(valid.fields).each(function(i, field) {
//           this.displayError(field.el, field.error);
//         }.bind(this));
//         scroll.to($(valid.fields[0].el)[0].id);
//       }
//     }
//   },
//   reCaptchaSubmit(form) {
//     var $form = $(form),
//       $recaptcha = $('.g-recaptcha', $form);
//
//     if($recaptcha.length && typeof grecaptcha !== 'undefined') {
//       if(!$recaptcha.attr('data-token')) {
//         grecaptcha.execute();
//         // Return true since captcha has been performed
//         return true;
//       }
//     }
//
//     return false;
//   },
//   onReCaptchaSucess(token, formId) {
//     if(typeof grecaptcha === 'undefined') {
//       return false;
//     }
//
//     debug('form.onReCaptchaSucess: token formId', token, formId);
//
//     var $form = $('form[data-form-id=' + formId + ']');
//
//     if(!$form.length) {
//       grecaptcha.reset();
//       return;
//     }
//
//     var $captcha = $('.g-recaptcha', $form),
//       captcha = $captcha.val(),
//       $settings = $('[name=captcha_settings]', $form);
//
//     $captcha.attr('data-token', token);
//     if($settings.length) {
//       var settings = JSON.parse($settings.val());
//       settings.ts = JSON.stringify(new Date().getTime());
//       $settings.val(JSON.stringify(settings));
//     }
//
//     grecaptcha.reset();
//
//     if( app.env('development') ) {
//       var retURL = $('[name=retURL]');
//       if($('[name=retURL]').length) {
//         retURL = retURL.val();
//       } else {
//         retURL = window.location;
//       }
//       window.location.href = retURL;
//       window.location.reload();
//     } else {
//       $form.submit();
//     }
//   },
//   resetErrors(form) {
//     var $form = $(form);
//     $('.form-group.has-error--', $form).removeClass('has-error--').removeAttr('data-error');
//   },
//   resetError(field) {
//     var $field = $(field);
//     $field.parent('.form-group.has-error--').removeClass('has-error--').removeAttr('data-error');
//   },
//   onFieldBlur(evt) {
//     var valid = this.validateField(evt.currentTarget),
//       $form = $(evt.currentTarget).parents('form');
//
//     if(!valid.success) {
//       this.displayError(valid.el, valid.error);
//     } else {
//       this.resetError(valid.el);
//     }
//   },
//   validateForm(form) {
//     var $form = $(form),
//     status = {
//       success: true,
//       fields: []
//     };
//
//     $('input,select,textarea', $form).each(function(i, el) {
//       var validateField = this.validateField(el);
//       if(!validateField.success) {
//         status.fields.push(validateField);
//         status.success = false;
//       }
//     }.bind(this));
//
//     debug('form.validateForm: status', status);
//     return status;
//   },
//   validateField(field) {
//     var $field = $(field),
//     val = $field.val(),
//     valid = {
//       success: true,
//       el: $field[0]
//     };
//
//     if(val.length && typeof val === 'string') {
//       val = val.trim();
//     }
//
//     // Validate Required
//     if($field.attr('required') || $field.hasClass('required')) {
//       if(!val.length) {
//         valid.success = false;
//         valid.error = 'required';
//         return valid;
//       }
//     }
//
//     // Validate First Name
//     if($field.attr('name') === 'first_name' || $field.attr('name') === 'firstname' || $field.attr('name') === 'fname') {
//       if(val.length && !this.validateName(val)) {
//         valid.success = false;
//         valid.error = 'invalid';
//         return valid;
//       }
//     }
//
//     // Validate Last Name
//     if($field.attr('name') === 'last_name' || $field.attr('name') === 'lastname' || $field.attr('name') === 'lname') {
//       if(val.length && !this.validateName(val)) {
//         valid.success = false;
//         valid.error = 'invalid';
//         return valid;
//       }
//     }
//
//     // Validate Email
//     if($field.attr('name') === 'email' || $field.attr('type') === 'email') {
//       if(val.length && !this.validateEmail(val)) {
//         valid.success = false;
//         valid.error = 'invalid';
//         return valid;
//       }
//     }
//
//     // Validate Phone
//     if($field.attr('name') === 'phone' || $field.attr('type') === 'tel') {
//       if(val.length && !this.validatePhone(val)) {
//         valid.success = false;
//         valid.error = 'invalid';
//         return valid;
//       }
//     }
//
//     return valid;
//   },
//   validateName(name) {
//     var re = /^[a-zA-Z\-\_]*$/;
//     if(name.length < 2) {
//       return false;
//     }
//     return re.test(name);
//   },
//   validateEmail(email) {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
//   },
//   validatePhone(phone) {
//
//     // Detect if number starts with plus sign. Must be international.
//     if(phone.charAt(0) === '+') {
//       phone = phone.substring(1);
//       var re = /^[\+]?[0-9]{1,3}?[\ ]?[0-9]{1,16}$/im; // @todo Might be a better way to validate international number
//       return re.test(phone);
//     }
//
//     phone = phone.split('x')[0];
//     phone = phone.trim();
//
//     var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
//     return re.test(phone);
//   },
//   validateSelect(el) {
//     var $el = $(el),
//       val = $el.val();
//
//     if(val.length && typeof val === 'string') {
//       val = val.trim();
//     }
//     // This could be a string or an array
//     if(!val.length) {
//       $el.addClass('invalid');
//     } else {
//       $el.removeClass('invalid');
//     }
//   },
//   displayError(field, errorType) {
//     var $field = $(field);
//
//     $field.parent('.form-group').addClass('has-error--');
//     $field.parent('.form-group').attr('data-error', errorType);
//   },
//   clearForm(form) {
//     var $form = $(form);
//     $form[0].reset();
//   },
//   loadRecaptcha(form) {
//     debug('form.loadRecaptcha');
//
//     var $form = $(form),
//       $recaptcha = $('.g-recaptcha', $form);
//
//     if($recaptcha.length) {
//       $recaptcha.attr('data-callback', 'onRecaptchaSuccess' + $form.data('form-id'));
//       $recaptcha.attr('data-sitekey', this._options.sitekey);
//       $form.append('<script>var onRecaptchaSuccess' + $form.data('form-id') + ' = function(token) {form.onReCaptchaSucess(token,"'+$form.data('form-id')+'");};</script>');
//       util.asyncLoadScript('https://www.google.com/recaptcha/api.js');
//     }
//   },
//   initInputMasks(form) {
//     var $form = $(form);
//
//     $(":input[data-inputmask]", $form).inputmask();
//     $(":input[type=tel]", $form).inputmask({
//       // mask: ["999-999-9999 [x99999]", "+099 99 99 9999[9]-9999"],
//       mask: ["999-999-9999 [x9999999]", "+9{0,3} [*{1,14}]"], // @todo Might be a better way to mask international numbers
//       greedy: false,
//       showMaskOnHover: false
//     });
//   },
//   initSelectChange(form) {
//     var $form = $(form);
//     $('select', $form).each(function(i, el) {
//       this.validateSelect(el);
//       $(el).on('change', function(evt) {
//         this.validateSelect(evt.currentTarget);
//       }.bind(this));
//     }.bind(this));
//   },
//   initConditionals(form) {
//     var $form = $(form);
//     $('.form-conditional', $form).each(function(i, el) {
//
//       var $el = $(el),
//         target = $el.attr('data-conditional'),
//         $target = $('[name=' + target + ']', $form);
//
//       this.checkConditional(el, form);
//
//       $target.on('change', function(evt) {
//         this.checkConditional(el, form);
//       }.bind(this));
//     }.bind(this));
//   },
//   checkConditional(el, form) {
//     var $form = $(form),
//       $el = $(el),
//       target = $el.attr('data-conditional'),
//       logic = $el.attr('data-conditional-logic'),
//       $target = $('[name=' + target + ']', $form);
//
//     switch (logic) {
//       case 'not-empty':
//
//         if( $target.val().trim().length ) {
//           // Not Empty
//           this.changeConditionalStatus(el, true);
//           $('.conditional-check-when-not-empty', $el).prop("checked", true);
//           $('.conditional-select-when-not-empty', $el).prop("selected", true);
//         } else {
//           // Empty
//           this.changeConditionalStatus(el, false);
//           $('.conditional-check-when-empty', $el).prop("checked", true);
//           $('.conditional-select-when-empty', $el).prop("selected", true);
//         }
//
//         break;
//
//       case 'empty':
//
//         if( !$target.val().trim().length ) {
//           // Empty
//           this.changeConditionalStatus(el, true);
//           $('.conditional-check-when-not-empty', $el).prop("checked", true);
//           $('.conditional-select-when-not-empty', $el).prop("selected", true);
//         } else {
//           // Not Empty
//           this.changeConditionalStatus(el, false);
//           $('.conditional-check-when-empty', $el).prop("checked", true);
//           $('.conditional-select-when-empty', $el).prop("selected", true);
//         }
//
//         break;
//
//       default:
//     }
//   },
//   changeConditionalStatus(el, show) {
//     var $el = $(el);
//
//     if(show != false) {
//       if($el.attr('aria-hidden') === 'false') {
//         return;
//       }
//
//       $el.css({'position':'absolute','visibility':'hidden', 'display':'block', 'height':'auto'});
//       var height = $el.height() + 'px';
//       $el.removeAttr('style');
//
//       $el.data('height', height);
//       $el.css({'height': '0'});
//
//       setTimeout(function() {
//         $el.css({'height': height});
//         $el.attr('aria-hidden', false);
//       }, 30);
//
//     } else {
//       if($el.attr('aria-hidden') === 'true') {
//         return;
//       }
//
//       $el.css({'height': $el.data('height')});
//
//       setTimeout(function() {
//         $el.css({'height': '0px'});
//         $el.attr('aria-hidden', true);
//
//         $el.one(window.transitionEvent, function() {
//           $el.removeAttr('style');
//         });
//       }, 30);
//     }
//
//   }
// }
//
// window.form = form;
//
// })(jQuery, window, document);
