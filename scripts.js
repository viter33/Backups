/*Live Search*/
jQuery(document).ready(function($) {
    // Close button
    $('.search-container .icon-close').on('click', function(e){
        e.preventDefault();
        $('.search-container #search').val('');
    });
    // Live Search
    $("#live-search-form").on('submit', function(e){
      e.preventDefault();
    //   Set variables
      var ajaxUrl = my_ajax_object.ajax_url,
          ajaxNonce = my_ajax_object.ajax_nonce,
          keyword   = $('.search-container #search').val(),
          imageUrl  = $(this).data('loader');
        // Set current keywords to div
        $('section.blog .keyword').text(keyword);
        // Show banner
      document.querySelector('section.blog .search-results-banner').classList.replace('d-none', 'd-flex');
    //   Show Loader
      $('section.blog .loader').show();
    //   Empty posts container
      $("section.blog .posts").html('');
        
    // Set data for ajax
      var data = {
        action: 'blog_posts_search',
        nonce: ajaxNonce,
        search_query: keyword
      };
  
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        dataType: "json",
        data: data,
        success: function (response) {
        $('section.blog .loader').hide();
        if (response.html.length > 0) {
          $("section.blog .posts").html(response.html);
        } else {
          $("section.blog .posts").html("<div class='no-results pt-5'>No results found.</div>");
        }
        }
      });
    });
  });
  


/*Scroll to top*/
jQuery(document).ready(function() {
    jQuery("a[href='#top']").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    /*Anchors*/
    document.querySelectorAll('body:not(.custom-anchors, .single-articles) a[href^="#"]').forEach(anchor => { // fix symbols in anchor (?/,.)
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});

// Speed Optimization Start
/*Lazy Load for Video*/
$(function() {
    $(".benefits-section video source").each(function() {
        var sourceFile = $(this).attr("data-src");
        $(this).attr("src", sourceFile);
        var video = this.parentElement;
        video.load();
    });
});
// Speed Optimization End

// Put video links
$(document).ready(function () {
    setTimeout(() => {
        $(".benefits-section video source").each(function(){
            $(this).attr('src', $(this).attr('data-source'));
        });
        $(".benefits-section video").load();
    });
}, 3000);

/*Autofill inputs*/
jQuery(document).ready(function() {

    setTimeout(function() {
        if (tq_first_name || tq_user_email) {

            var tq_test_first_name = document.querySelectorAll('input[name="your-name"]');
            var input_first_name = document.querySelectorAll('input[name="first-name"]');
            var input_last_name = document.querySelectorAll('input[name="last-name"]');
            var tq_test_email = document.querySelectorAll('input[name="your-email"]');
            var input_linkedin_url = document.querySelectorAll('input[name="linkedin-url"]');

            if (tq_user_display_name) {
                for (var t1 = 0;t1 < tq_test_first_name.length; ++t1) {
                    tq_test_first_name[t1].value = tq_user_display_name;
                }
            }
            if (tq_first_name) {
                for (var t2 = 0;t2 < input_first_name.length; ++t2) {
                    input_first_name[t2].value = tq_first_name;
                }
            }
            if (tq_last_name) {
                for (var t3 = 0;t3 < input_last_name.length; ++t3) {
                    input_last_name[t3].value = tq_last_name;
                }
            }
            if (tq_user_email) {
                for (var t4 = 0;t4 < tq_test_email.length; ++t4) {
                    tq_test_email[t4].value = tq_user_email;
                }
            }
            if (tq_linkedin) {
                for (var t5 = 0;t5 < input_linkedin_url.length; ++t5) {
                    input_linkedin_url[t5].value = tq_linkedin;
                }
            }


            jQuery('input[type=submit],.wpcf7-submit').click( function () {
                var tq_test_first_name = document.querySelectorAll('input[name="your-name"].hidden');
                var input_first_name = document.querySelectorAll('input[name="first-name"].hidden');
                var input_last_name = document.querySelectorAll('input[name="last-name"].hidden');
                var tq_test_email = document.querySelectorAll('input[name="your-email"].hidden');
                var input_linkedin_url = document.querySelectorAll('input[name="linkedin-url"].hidden');

                if (tq_user_display_name) {
                    for (var t1 = 0;t1 < tq_test_first_name.length; ++t1) {
                        tq_test_first_name[t1].value = tq_user_display_name;
                    }
                }
                if (tq_first_name) {
                    for (var t2 = 0;t2 < input_first_name.length; ++t2) {
                        input_first_name[t2].value = tq_first_name;
                    }
                }
                if (tq_last_name) {
                    for (var t3 = 0;t3 < input_last_name.length; ++t3) {
                        input_last_name[t3].value = tq_last_name;
                    }
                }
                if (tq_user_email) {
                    for (var t4 = 0;t4 < tq_test_email.length; ++t4) {
                        tq_test_email[t4].value = tq_user_email;
                    }
                }
                if (tq_linkedin) {
                    for (var t5 = 0;t5 < input_linkedin_url.length; ++t5) {
                        input_linkedin_url[t5].value = tq_linkedin;
                    }
                }
                console.log('tq_user_email_click', tq_user_email);
            })

            console.log('tq_user_email', tq_user_email);
        }
        return false;
    }, 2000);

    setTimeout(function() {
        if (user_ip) {

            var user_ip_input = document.querySelectorAll('input[name="user-ip"]');
            for (var u1 = 0;u1 < user_ip_input.length; ++u1) {
                user_ip_input[u1].value = user_ip;
            }
            console.log('user_ip', user_ip);

        }
        return false;
    }, 2000);


});


/*CF7 autofill from cookie*/
setTimeout(function() {
    function readCookie(cookie_name) {
        var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
        if (results)
            return ( unescape(results[2]) );
        else
            return null;
    }

    // var form_data = readCookie('form-data');
    var form_data = JSON.parse(readCookie('form-data'));
    if (form_data !== null) {
        var email_inp = document.querySelectorAll('input[name="your-email"]');
        var function_inp = document.querySelectorAll('input[name="function"]');
        var name_inp = document.querySelectorAll('input[name="your-name"]');
        // email_inp[0].value = form_data.email;
        // email_inp[1].value = form_data.email;
        // tech_stack_inp[0].value = form_data.techStack;
        // tech_stack_inp[1].value = form_data.techStack;
        for (var f1 = 0;f1 < email_inp.length; ++f1) {
            email_inp[f1].value = form_data.email;
        }
        for (var f2 = 0;f2 < function_inp.length; ++f2) {
            function_inp[f2].value = form_data.function_value;
        }
        for (var f3 = 0;f3 < name_inp.length; ++f3) {
            name_inp[f3].value = form_data.name;
        }
    }

    // console.log('form_data', form_data);
}, 2000);

/*Checked input on CF7*/
jQuery(document).ready(function() {

    jQuery(".default-form .wpcf7-acceptance .wpcf7-list-item-label").click(function(){
        if (!jQuery('.default-form .wpcf7-acceptance input').prop('checked')){
            jQuery(".default-form .wpcf7-acceptance .wpcf7-list-item-label").addClass("checked");
        } else {
            jQuery(".default-form .wpcf7-acceptance .wpcf7-list-item-label").removeClass("checked");
        }
    });

});

/*Base url CF7*/
jQuery(document).ready(function() {

    setTimeout(function() {

        var base_url_input = document.querySelectorAll('input[name="base_url"]');
        var base_url = window.location.href;
        // console.log(base_url);

        for (var b1 = 0;b1 < base_url_input.length; ++b1) {
            base_url_input[b1].value = base_url;
        }

        jQuery('.wpcf7-submit').click(function () {
            for (var b1 = 0;b1 < base_url_input.length; ++b1) {
                base_url_input[b1].value = base_url;
            }
        });

        return false;
    }, 1000);

});


/*CF upload field*/
jQuery('#uploadfile').click(function() {
    jQuery('#fileuploadfield').click();
});
jQuery('input[type=file]').bind('change', function() {
    var str = "";
    str = jQuery(this).val().split("\\").slice(-1)[0];
    jQuery("#filename").text(str);
}).change();


/*Forms start*/

// Targets all textareas with class "txta"
let textareas = document.querySelectorAll('.txta'),
    hiddenDiv = document.createElement('div'),
    content = null;

// Adds a class to all textareas
for (let j of textareas) {
    j.classList.add('txtstuff');
}

// Build the hidden div's attributes

// The line below is needed if you move the style lines to CSS
// hiddenDiv.classList.add('hiddendiv');

// Add the "txta" styles, which are common to both textarea and hiddendiv
// If you want, you can remove those from CSS and add them via JS
hiddenDiv.classList.add('txta');

// Add the styles for the hidden div
// These can be in the CSS, just remove these three lines and uncomment the CSS
hiddenDiv.style.display = 'none';
hiddenDiv.style.whiteSpace = 'pre-wrap';
hiddenDiv.style.wordWrap = 'break-word';

// Loop through all the textareas and add the event listener
for(let i of textareas) {
    (function(i) {
        // Note: Use 'keyup' instead of 'input'
        // if you want older IE support
        i.addEventListener('input', function() {

            // Append hiddendiv to parent of textarea, so the size is correct
            i.parentNode.appendChild(hiddenDiv);

            // Remove this if you want the user to be able to resize it in modern browsers
            i.style.resize = 'none';

            // This removes scrollbars
            i.style.overflow = 'hidden';

            // Every input/change, grab the content
            content = i.value;

            // Add the same content to the hidden div

            // This is for old IE
            content = content.replace(/\n/g, '<br>');

            // The <br ..> part is for old IE
            // This also fixes the jumpy way the textarea grows if line-height isn't included
            hiddenDiv.innerHTML = content + '<br style="line-height: 2rem;">';

            // Briefly make the hidden div block but invisible
            // This is in order to read the height
            hiddenDiv.style.visibility = 'hidden';
            hiddenDiv.style.display = 'block';
            i.style.height = hiddenDiv.offsetHeight + 'px';

            // Make the hidden div display:none again
            hiddenDiv.style.visibility = 'visible';
            hiddenDiv.style.display = 'none';
        });
    })(i);
}

/*Privacy policy form - select field*/
jQuery(document).ready(function() {
    const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands",
        "Colombia",
        "Comoros",
        "Congo",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands [Malvinas]",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom of Great Britain and Northern Ireland",
        "United States Minor Outlying Islands",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ];


    var countryCount = countryList.length;
    for(i=0; i<countryCount; i++) {
        /*console.log(countryList[i]);*/
        jQuery('.default-form.popup.long .location select').append('<option>' + countryList[i] + '</option>');
    }
});

jQuery(document).ready(function() {
    /*Show Popup Forms*/
    jQuery('a[href="#request-sponsorship-information"]').click(function() {
        jQuery("#become_a_sponsor .default-form.popup").addClass('active').attr('style', '');
    });

    /* Cancel button */
    jQuery('.cancel-btn').click(function() {
        jQuery(".default-form.popup").removeClass('active');
    });

    /* Thank you popup */
    jQuery(".ty-btn").click(function() {
        jQuery(".default-form").removeClass('success');
    });
});

/*Forms*/
jQuery(document).ready(function() {
    /* Remove d-none from popup forms */
    setTimeout(function () {
        jQuery(".default-form.popup").removeClass('d-none');
        jQuery(".default-form.popup .thank-you-popup").removeClass('d-none');
    }, 2000);


    /*Label animation*/
    jQuery(".default-form .hyp-field_form input, .default-form .hyp-field_form textarea").focus(function(){
        jQuery(this).closest('div').children('.placeholder').addClass('active');
    });
    jQuery(".default-form .hyp-field_form input, .default-form .hyp-field_form textarea").blur(function(){
        var form_in_focus = jQuery(this);
        var input_value = jQuery(this).val();
        if( input_value.length == 0) {
            jQuery(form_in_focus).closest('div').children('.placeholder').removeClass('active');
        };
    });

    /*If autofill from cookie*/
    setTimeout(function () {
        var inputs = jQuery(".hyp-field_form input");
        for(i=0; jQuery(inputs).length > i; i++) {
            if(jQuery(inputs[i]).val() != '') {
                console.log(jQuery(inputs[i]).val())
                jQuery(inputs[i]).closest('.hyp-field_form').children('.placeholder').addClass('active');
            }
        }
    }, 2500);

    /*Select animation*/
    jQuery(".default-form .hyp-field_form select").focus(function() {
        jQuery(this).addClass('in-focus');
    });
    jQuery(".default-form .hyp-field_form select").blur(function() {
        jQuery(this).removeClass('in-focus');
    });
    jQuery(".default-form .hyp-field_form select").click( function() {
        var select_id = jQuery(this).closest('div').attr('class').split(/\s+/);
        jQuery(".default-form .hyp-field_form." + select_id[1]).removeClass('done');
    });
    jQuery(".default-form .hyp-field_form select").on("input", function() {
        var select_id = jQuery(this).closest('div').attr('class').split(/\s+/);
        jQuery(".default-form .hyp-field_form." + select_id[1]).addClass('done');
        jQuery(this).removeClass('choosing');
    });
    jQuery(".default-form .hyp-field_form select").click(function() {
        var select_id = jQuery(this).closest('div').attr('class').split(/\s+/);
        jQuery(".default-form .hyp-field_form." + select_id[1]).addClass('done');
        if( jQuery(this).closest('div').hasClass('choosing') ) {
            jQuery(this).closest('div').removeClass('choosing');
        } else if ( jQuery(this).val() == "" ) {
            if( jQuery(this).closest('div').not('choosing') ) {
                jQuery(this).closest('div').addClass('choosing');
            }
            jQuery(".default-form .hyp-field_form." +  select_id[1]).removeClass('done');
        } else {
            jQuery(this).closest('div').addClass('choosing');
        }
    });

    jQuery("option").each(function() {
        var text = jQuery(this).text();
        text = text.replace("---", "");
        jQuery(this).text(text);
    });


    /* Error form */
    jQuery(".icon-error").mouseenter(function() {
        jQuery(this).closest('div').addClass('active');
    });
    jQuery(".icon-error").mouseleave(function() {
        jQuery(this).closest('div').removeClass('active');
    });

    /* Thank you popup */
    jQuery(".thank-you-btn").click(function() {
        jQuery(".default-form").removeClass('success');
    });

    jQuery(".bg-popup").click(function() {
        jQuery(".default-form").removeClass('success');
    });

    /* Acceptance */
    jQuery(".wpcf7-acceptance .wpcf7-list-item-label").click(function() {
        if( jQuery(this).closest('label').hasClass('check') ) {
            jQuery(this).closest('label').removeClass('check');
        } else {
            jQuery(this).closest('label').addClass('check');
        };
    });



    /* Active Popup */
    jQuery('a[href="#agency-request-pass"]').click(function() {
        jQuery("#agency_request_pass .default-form.popup").addClass('active').attr('style', '');
    });
    jQuery('a[href="#agency-request-enter"]').click(function() {
        jQuery("#agency_request_enter .default-form.popup").addClass('active').attr('style', '');
    });
    jQuery('a[href="#agency-contact-us"]').click(function() {
        jQuery("#agency_contact_us .default-form.popup").addClass('active').attr('style', '');
    });
    jQuery('a[href="#privacy-policy"]').click(function() {
        jQuery("#privacy_policy .default-form.popup").addClass('active').attr('style', '');
    });
    jQuery('a[href="#privacy-policy-long"]').click(function() {
        jQuery("#privacy_policy_long .default-form.popup").addClass('active').attr('style', '');
    });

    /* Cancel button */
    jQuery('.cancel-button').click(function() {
        jQuery(".default-form.popup").removeClass('active');
    });
    jQuery('.bg-popup').click(function() {
        jQuery(".default-form.popup").removeClass('active');
    });

    jQuery('#placeholder').click(function() {
        jQuery("input").blur();
    });


    /* Error form - if not sent*/
    document.addEventListener('wpcf7invalid', function (event) {
        setTimeout(function () {
            jQuery('.default-form .hyp-field_form input').each(function () {
                if( jQuery(this).hasClass('wpcf7-not-valid')) {
                    jQuery(this).closest('div').addClass('error');
                } else {
                    jQuery(this).closest('div').removeClass('error');
                };
            });
        }, 1);
    }, false);

});

/* Send form */
jQuery(document).ready(function() {

    document.addEventListener( 'wpcf7mailsent', function( event ) {

        if ( event.detail.contactFormId ) {
            if ('2502' == event.detail.contactFormId) {

                /*LinkedIn Tracking*/
                window.lintrk('track', { conversion_id: 9782025 });

                jQuery('.thank-you-block').removeClass('d-none');
                setTimeout(function(){
                    jQuery('.thank-you-block .default-form.popup').addClass('success');
                    var file = new File(["aa"], "Tech_Stack_Secrets_Revealed");
                    var link = document.createElement("a");
                    link.download =file.name;
                    link.href = "/wp-content/uploads/2022/07/Tech-Stack-Secrets-Revealed.pdf";
                    link.click();
                    return false;
                }, 500);

                /*Facebook Event*/
                FbEvents.SubmitApplication();
            } else if ('3411' == event.detail.contactFormId) {

                /*LinkedIn Tracking*/
                window.lintrk('track', { conversion_id: 9782025 });

                jQuery('.thank-you-block').removeClass('d-none');
                setTimeout(function(){
                    jQuery('.thank-you-block .default-form.popup').addClass('success');
                    var file = new File(["aa"], "Tech_Stack_Secrets_Revealed");
                    var link = document.createElement("a");
                    link.download =file.name;
                    link.href = "/wp-content/uploads/2022/07/Tech-Stack-Secrets-Revealed.pdf";
                    link.click();
                    return false;
                }, 500);

                /*Facebook Event*/
                FbEvents.SubmitApplication();
            } else if ('4209' == event.detail.contactFormId) {

                /*LinkedIn Tracking*/
                window.lintrk('track', { conversion_id: 9782025 });

                jQuery('.thank-you-block').removeClass('d-none');
                setTimeout(function(){
                    jQuery('.thank-you-block .default-form.popup').addClass('success');
                    var file = new File(["aa"], "Exactly_How_The_Top_B2B_Leaders_Set_Meetings");
                    var link = document.createElement("a");
                    link.download =file.name;
                    link.href = "/wp-content/uploads/2022/10/Exactly-How-The-Top-B2B-Leaders-Set-Meetings.pdf";
                    link.click();
                    return false;
                }, 500);

                /*Facebook Event*/
                FbEvents.SubmitApplication();
            } else if ('5782' == event.detail.contactFormId) {
                jQuery('#request_participation_info .thank-you-popup').removeClass('d-none');
                setTimeout(function(){
                    jQuery('#request_participation_info .default-form-one-btn').addClass('success');
                    setTimeout(function() {
                        jQuery('#request_participation_info .thank-you-popup').addClass('d-none');
                        jQuery('#request_participation_info .default-form-one-btn').removeClass('success');
                    }, 5000);
                }, 500);
            } else if ('6147' == event.detail.contactFormId) {

                /*LinkedIn Tracking*/
                window.lintrk('track', { conversion_id: 9782025 });

                jQuery('.thank-you-block').removeClass('d-none');
                setTimeout(function(){
                    jQuery('.thank-you-block .default-form.popup').addClass('success');
                    var file = new File(["aa"], "Exactly_How_To_Generate_Leads_In_a_Downturn");
                    var link = document.createElement("a");
                    link.download =file.name;
                    link.href = "/wp-content/uploads/2022/11/PDF-Exactly-How-To-Generate-Leads-In-a-Downturn.pdf";
                    link.click();
                    return false;
                }, 500);

                /*Facebook Event*/
                FbEvents.SubmitApplication();
            } else if ('6727' == event.detail.contactFormId ) {
                jQuery('.hyp-default_page.preferences-page .main-title').addClass('hide');
                jQuery('.hyp-default_page.preferences-page .main-content-block').addClass('hide');
                setTimeout( function () {
                    jQuery('.hyp-default_page.preferences-page .search').removeClass('hide-search');

                    jQuery('.hyp-default_page.preferences-page .main-title').addClass('remove');
                    jQuery('.hyp-default_page.preferences-page .main-content-block').addClass('remove');

                    jQuery('.hyp-default_page.preferences-page .thank-you-title').addClass('add');
                    jQuery('.hyp-default_page.preferences-page .thank-you-content-block').addClass('add');

                    setTimeout( function () {
                        jQuery('.hyp-default_page.preferences-page .thank-you-title').addClass('show');
                        jQuery('.hyp-default_page.preferences-page .thank-you-content-block').addClass('show');
                    }, 100);
                }, 300);
            } else if ( '6726' == event.detail.contactFormId ) {
                jQuery('.hyp-default_page.preferences-page .main-title').addClass('hide');
                jQuery('.hyp-default_page.preferences-page .main-content-block').addClass('hide');
                setTimeout( function () {
                    jQuery('.hyp-default_page.preferences-page .search').removeClass('hide-search');

                    jQuery('.hyp-default_page.preferences-page .main-title').addClass('remove');
                    jQuery('.hyp-default_page.preferences-page .main-content-block').addClass('remove');

                    jQuery('.hyp-default_page.preferences-page .thank-you-title').addClass('add');
                    jQuery('.hyp-default_page.preferences-page .thank-you-content-block').addClass('add');

                    setTimeout( function () {
                        jQuery('.hyp-default_page.preferences-page .thank-you-title').addClass('show');
                        jQuery('.hyp-default_page.preferences-page .thank-you-content-block').addClass('show');
                    }, 100);
                }, 300);
            }

            var form_id = '';
            jQuery(".wpcf7").each(function() {
                var numb_form = jQuery(this).attr('id');
                /*console.log(numb_form);*/
                if( numb_form.indexOf(event.detail.contactFormId) > 0 ) {
                    form_id = jQuery(this).attr('id');
                    /*console.log(form_id);*/
                } else {
                    /*console.log('no')*/
                };
            });
            /*console.log(form_id);*/
            var length_form_id = form_id.length;
            /*console.log(length_form_id);*/
            if( length_form_id >= 15 ) {
                var last_char_id = form_id.substr(-2);
            } else {
                var last_char_id = form_id.substr(-1);
            }
            /*console.log(last_char_id);*/
            jQuery(".wpcf7-acceptance .wpcf7-list-item-label").closest('label').removeClass('check');
            console.log(form_id.indexOf('-f'));
            if( form_id.indexOf('-f') > 0 ) {
                var p_search = form_id.substring(form_id.indexOf('-'));
                /*console.log(p_search);*/
                var p_char = p_search.substring(p_search.indexOf('f')+ 1);
                var p_number = p_char.slice(0, -3);
                /*console.log(p_number);*/
                var success_form = jQuery("#wpcf7-f"+ event.detail.contactFormId + "-o" +last_char_id+ "");
                /*console.log(success_form);*/
                jQuery(success_form).find('.default-form').addClass('success');
                jQuery(success_form).find('.default-form').removeClass('active');
                jQuery(success_form).find('.placeholder').removeClass('active');
                jQuery('.function').removeClass('done');
                setTimeout(function() {
                    jQuery(success_form).find('.default-form').removeClass('success');
                }, 5000);
            } else {
                var success_form = jQuery("#wpcf7-f"+ event.detail.contactFormId +"-o" +last_char_id+ "");
                /*console.log(success_form);*/
                jQuery(success_form).find('.default-form').addClass('success');
                jQuery(success_form).find('.default-form').removeClass('active');
                jQuery(success_form).find('.placeholder').removeClass('active');
                jQuery('.function').removeClass('done');
                setTimeout(function() {
                    jQuery(success_form).find('.default-form').removeClass('success');
                }, 5000);
            }
        };
    });
});


jQuery(document).ready(function() {

    /*Default Checkbox Preferences Form*/
    jQuery(".desktop-form.preference-form input[type=submit]").prop('disabled', true);
    let checkbox_counter = 0;
    jQuery(".desktop-form.preference-form .hyp-field_form.checkbox").click(function() {
        let hidden_inputs = jQuery('.desktop-form.preference-form.update-preferences .hidden input[type=checkbox]');
        if( !jQuery(this).hasClass('disabled') ) {
            if (!jQuery(this).find('input').prop('checked')) {
                /*Update preferences form*/
                if( jQuery(this).closest('.desktop-form.preference-form').hasClass('update-preferences') ) {
                    jQuery(this).find('input').prop('checked', true);
                    let input_name = jQuery(this).find('input').prop('name');
                    input_name = input_name.replaceAll('_', ' ').replace('update', '').replaceAll('[]', ' ').replaceAll(' ', '');
                    for( let i=0; hidden_inputs.length > i; i++ ) {
                        let hidden_input_name = jQuery(hidden_inputs[i]).prop('name');
                        hidden_input_name = hidden_input_name.replaceAll('_', ' ').replaceAll('[]', ' ').replaceAll(' ', '');
                        // console.log( hidden_input_name + ' ' + input_name );
                        if( input_name === hidden_input_name ) {
                            jQuery(hidden_inputs[i]).val('Yes');
                            checkbox_counter++;
                        }
                    }
                    // console.log( 'checkbox_counter ' + checkbox_counter);
                    if( checkbox_counter === 0 ) {
                        jQuery(".desktop-form.preference-form input[type=submit]").prop('disabled', true);
                    } else {
                        jQuery(".desktop-form.preference-form input[type=submit]").prop('disabled', false);
                    }
                    jQuery(this).find('.form-block input').val('Yes');

                    /*Unsubscribe form*/
                } else if( jQuery(this).closest('.desktop-form.preference-form').hasClass('unsubscribe') ) {
                    jQuery(this).find('input').prop('checked', true);
                    jQuery(this).find('input').val('No');
                    checkbox_counter++;
                    if( checkbox_counter === 0 ) {
                        jQuery(".desktop-form.preference-form input[type=submit]").prop('disabled', true);
                    } else {
                        jQuery(".desktop-form.preference-form input[type=submit]").prop('disabled', false);
                    }
                }
            } else {
                /*Update preferences form*/
                if( jQuery(this).closest('.desktop-form.preference-form').hasClass('update-preferences') ) {
                    jQuery(this).find('input').prop('checked', false);
                    let input_name = jQuery(this).find('input').prop('name');
                    input_name = input_name.replaceAll('_', ' ').replace('update', '').replaceAll('[]', ' ').replaceAll(' ', '');
                    for( let i=0; hidden_inputs.length > i; i++ ) {
                        let hidden_input_name = jQuery(hidden_inputs[i]).prop('name');
                        hidden_input_name = hidden_input_name.replaceAll('_', ' ').replaceAll('[]', ' ').replaceAll(' ', '');
                        // console.log( hidden_input_name + ' ' + input_name );
                        if( hidden_input_name === input_name ) {
                            jQuery(hidden_inputs[i]).val('No');
                            checkbox_counter--;
                        }
                    }
                    // console.log( 'checkbox_counter ' + checkbox_counter);
                    if( checkbox_counter === 0 ) {
                        jQuery(".desktop-form.preference-form input[type=submit]").prop('disabled', true);
                    } else {
                        jQuery(".desktop-form.preference-form input[type=submit]").prop('disabled', false);
                    }
                    jQuery(this).find('.form-block input').val('No');

                    /*Unsubscribe form*/
                } else if( jQuery(this).closest('.desktop-form.preference-form').hasClass('unsubscribe') ) {
                    jQuery(this).find('input').prop('checked', false);
                    jQuery(this).find('input').val('Yes');
                    checkbox_counter--;
                    if( checkbox_counter === 0 ) {
                        jQuery(".desktop-form.preference-form input[type=submit]").prop('disabled', true);
                    } else {
                        jQuery(".desktop-form.preference-form input[type=submit]").prop('disabled', false);
                    }
                }
            }
        } else {
            jQuery(this).find('input').prop('checked', true).val('No');
        }
    });

    /*Preference Checkbox*/
    jQuery(".default-form.preference-form .hyp-field_form.checkbox").click(function() {
        if( !jQuery(this).hasClass('disabled') ) {
            if (jQuery(this).find('.wpcf7-list-item').hasClass('check')) {
                jQuery(this).find('.wpcf7-list-item').removeClass('check');
            } else {
                jQuery(this).find('.wpcf7-list-item').addClass('check');
            }
        }
    });

    /*Everything checkbox*/
    jQuery('.hyp-field_form.checkbox.everything').click( function () {
        let inputs = jQuery('.hyp-field_form.checkbox:not(.everything) input');
        if( jQuery('.hyp-field_form.checkbox.everything input').prop('checked') ) {
            for (let i = 0; inputs.length > i; i++) {
                jQuery(inputs[i]).prop('checked', true).val('No');
                jQuery(inputs[i]).closest('.hyp-field_form.checkbox:not(.everything)').find('.wpcf7-list-item').removeClass('check');
                jQuery(inputs[i]).closest('.hyp-field_form.checkbox:not(.everything)').addClass('disabled');
            }
        } else {
            for (let i = 0; inputs.length > i; i++) {
                jQuery(inputs[i]).prop('checked', false).val('Yes');
                jQuery(inputs[i]).closest('.hyp-field_form.checkbox:not(.everything)').removeClass('disabled');
            }
        }
    });

});
/*Forms end*/



/*Default*/
jQuery(document).ready(function() {

    /*Add class*/
    jQuery(".single_post_content p>img-old.alignnone").parent().addClass('inline-block');
    jQuery(".single_post_content p>img-old.aligncenter").parent().addClass('custom-text');


    /*Buttons*/
    jQuery('.hyp-btn_default_text').closest("a").addClass('hyp-btn_default');
    jQuery('.hyp-btn_default_arrow_text').closest("a").addClass('hyp-btn_default_arrow');
    jQuery('.hyp-btn_big_text').closest("a").addClass('hyp-btn_big');

    jQuery('.hyp-btn_default_border_text').closest("a").addClass('hyp-btn_default_border');
    jQuery('.hyp-btn_default_border_arrow_text').closest("a").addClass('hyp-btn_default_border_arrow');
    jQuery('.hyp-btn_big_border_text').closest("a").addClass('hyp-btn_big_border');

    // jQuery('.hyp-btn_default_border2_text').closest("a").addClass('hyp-btn_default_border2');
    jQuery('.hyp-btn_default_border_linkedin_text').closest("a").addClass('hyp-btn_default_linkedin');

    jQuery('.hyp-btn_simple_arrow_text').closest("a").addClass('hyp-btn_simple_arrow');



    jQuery('a:contains("Source")').addClass("img_source");



    /*Ajax loading on form*/
    jQuery('div.wpcf7 .btn_block [type=submit]').click(function() {
        jQuery(this).closest("div").addClass('loading');
    });
    document.addEventListener( 'wpcf7mailfailed', function( event ) {
        jQuery("div.wpcf7 .btn_block").removeClass("loading");
    }, false );

    document.addEventListener( 'wpcf7invalid', function( event ) {
        jQuery("div.wpcf7 .btn_block").removeClass("loading");
    }, false );

    document.addEventListener( 'wpcf7mailsent', function( event ) {
        jQuery("div.wpcf7 .btn_block").removeClass("loading");
    }, false );

    /*Disable select field*/
    jQuery("select#crm_vendor>option:first-child").prop("disabled", true);


});



/*Cookie Start*/

jQuery(document).ready(function() {

    //Save UTM in cookie

    //var start check URL for UTM;
    var checkUTM = setInterval(function() {

        // Initiate JQUERY
// Initiate cookie.js : https://github.com/js-cookie/js-cookie
// Parse the URL
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }




// Give the URL parameters variable names
        var source = getParameterByName('utm_source');
        var medium = getParameterByName('utm_medium');
        var campaign = getParameterByName('utm_campaign');
        var content = getParameterByName('utm_content');
        var term = getParameterByName('utm_term');
        // var referrer = getParameterByName('referring_url');
        // var url_referrer_input = document.querySelectorAll('input[name$="referring_url"]');



// Set utm function: assumes all hidden fields follow this format : <input name="utm_term" type="hidden">
        var set_utm = function setutm(utm_param, utm_val){
            var exdaysUTM = 1;
            var expiresUTM = new Date(new Date().getTime()+(exdaysUTM * 24 * 60 * 60 * 1000));
            if (Cookies.get(utm_param) != undefined) {
                jQuery('input[name="utm_'+utm_param+'"]').val('');
                console.log('Reset code for cookie time');
                jQuery('input[name="utm_'+utm_param+'"]').val(Cookies.get(utm_param));
                console.log('Set input to ' + Cookies.get(utm_param));
                // console.log('expiresUTM:' , expiresUTM);
            } else {
                // console.log('Using current code / no code set');
                if (utm_val != "" ) {
                    console.log('Set the cookie');
                    Cookies.set(utm_param, utm_val, {expires: expiresUTM, path: '/'});
                };
            };
            // Cookies.set(utm_param, utm_val, {expires: expiresUTM, path: '/'});
            // console.log('expiresUTM:' , expiresUTM);
        }
// Do the function for each UTM
        set_utm('source', source);
        set_utm('medium', medium);
        set_utm('campaign', campaign);
        set_utm('content', content);
        set_utm('term', term);
        // set_utm('referrer', referrer);




        return false;
    }, 1000);

    //Stop checking URL for UTM
    setTimeout(function() {
        clearInterval(checkUTM);
    }, 3000);






    /*Save in cookies*/
    document.addEventListener( 'wpcf7mailsent', function( event ) {

//Start
        console.log(event.detail)
        /*Form fields*/
        var name_inp = document.querySelectorAll('input[name$="your-name"]');
        // var lastn_inp = document.querySelectorAll('input[name$="last_name"]');
        var function_inp = document.querySelectorAll('input[name$="function"]');
        var email_inp = document.querySelectorAll('input[name$="your-email"]');
        // var tel_inp = document.querySelectorAll('input[name$="tel"]');
        // var crm_inp = document.querySelectorAll('select[name$="menu-crm"]');



        /*Form fields*/
        // var name = (name_inp[0].value != '') ? name_inp[0].value : name_inp[1].value;
        // var last_name = (lastn_inp[0].value != '') ? lastn_inp[0].value : lastn_inp[1].value;
        // var tech_stack = (tech_stack_inp[0].value != '') ? tech_stack_inp[0].value : tech_stack_inp[1].value;
        // var email = (email_inp[0].value != '') ? email_inp[0].value : email_inp[1].value;
        // var email = jQuery("input[type = 'email']").val();
        // var tel = (tel_inp[0].value != '') ? tel_inp[0].value : tel_inp[1].value;
        // var crm = (crm_inp[0].value != '') ? crm_inp[0].value : crm_inp[1].value;
        // for (var c4 = 0;c4 < email_inp.length; ++c4) {
        //     email_inp[c4].value = email;
        // }
        // var name = jQuery("input[type = 'email']").val();
        // var email_object = {
        //     email_object: event.detail.inputs['your-email'].value
        // };
        // console.log(email_object);

        var inputs = event.detail.inputs;
        for ( var c1 = 0; c1 < inputs.length; c1++ ) {
            if ( "your-name" == inputs[c1].name ) {
                var name = inputs[c1].value;
                break;
            }
        }
        // for ( var c2 = 0; c2 < inputs.length; c2++ ) {
        //     if ( "last_name" == inputs[c2].name ) {
        //         var last_name = inputs[c2].value;
        //         break;
        //     }
        // }
        for ( var c3 = 0; c3 < inputs.length; c3++ ) {
            if ( "function" == inputs[c3].name ) {
                var function_value = inputs[c3].value;
                break;
            }
        }
        for ( var c4 = 0; c4 < inputs.length; c4++ ) {
            if ( "your-email" == inputs[c4].name ) {
                var email = inputs[c4].value;
                break;
            }
        }

        // for(key in email_object) {
        //     if(email_object.hasOwnProperty(key)) {
        //         var email = email_object[key];
        //         //do something with value;
        //     }
        // }
        // var c_inputs = event.detail.c_inputs;
        // for ( var c4 = 0; c4 < c_inputs.length; c4++ ) {
        //     if ( 'your-email' == c_inputs[c4].name ) {
        //         alert( c_inputs[c4].value );
        //         break;
        //     }
        // }
        // console.log(c_inputs);





        //Save data
        var info = {
            name: name,
            // lastName: last_name,
            function_value: function_value,
            email: email
            // tel: tel,
            // crm: crm
        };

        var form = JSON.stringify(info);

        var d = new Date();
        var exdays = 120;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "form-data=" + form + ";" + expires + ";domain=hypcccycl.com;path=/;";



        //Check in console
        // console.log(name);
        // console.log(last_name);
        // console.log(tech_stack);
        // console.log(email);
        // console.log(tel);
        // console.log(crm);
        //
        // console.log(source);
        // console.log(medium);
        // console.log(campaign);
        // console.log(content);
        // console.log(term);
        // console.log(referrer);



    }, false );



// console.log('expires:' , expires);
// // console.log('expiresUTM:' , expiresUTM);
// // console.log('formUTM:' , formUTM);
    // console.log(email);
    // console.log(lastName);
    // получить значения всех cookies страницы
    var cookies = document.cookie;
// выведем куки в консоль браузера
    console.log(cookies);
// выведем с помощью функции alert
//     alert(cookies);

    setTimeout(function() {

        //URL referrer parameters save in cookie
        (function SaveUrlReferrer() {

            var url_referrer_input = document.querySelectorAll('input[name="referring_url"]');

            var referring_url = "";

            var cookie_referrer = Cookies.get("referring_url");
            var referrer = document.referrer;
            if (cookie_referrer !== undefined) {
                referring_url = cookie_referrer;
            }
            if (referrer.indexOf('hypcccycl.com') == -1 && referrer != "" && referrer !== " ") {
                let params_ = referrer;
                let dr_ = new Date();
                let exdays_ = 1;
                dr_.setTime(dr_.getTime() + (exdays_ * 24 * 60 * 60 * 1000));
                // dr_.setTime(dr_.getTime()+(30*1000));
                let expires_ = "expires=" + dr_.toUTCString();
                document.cookie = "referring_url=" + params_ + ";" + expires_ + ";domain=hypcccycl.com;path=/;";
                referring_url = referrer;
                // console.log('expires_:' , expires_);
            }

            for (var r1 = 0;r1 < url_referrer_input.length; ++r1) {
                url_referrer_input[r1].value = referring_url;
            }


            // console.log('Referrer:' , referring_url);
            // console.log('expires_:' , document.cookie);

        })();
        //URL referrer save in cookie

        return false;
    }, 3000);

    // var prev_link = history.back();
    // console.log('prev_link:' , prev_link);

});

jQuery(document).ready(function(){
    /*Client_id Cookie*/
    setTimeout(function() {
        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }
// var clientId2 = readCookie('_ga');
// var clientId = clientId2.replace('/GA[0-9]+\.[0-9]+\./', '');
        var clientId = readCookie('_ga').replace(/GA[0-9]+.[0-9]./g, '');
        var url_clientid_input = document.querySelectorAll('input[name="client_id"]');
        for (var i6 = 0;i6 < url_clientid_input.length; ++i6) {
            url_clientid_input[i6].value = clientId;
        }
        // console.log('clientId', clientId);
        return false;
    }, 3000);
});

/*Cookie End*/







/*Animation fade*/
jQuery(document).ready(function() {

    jQuery(window).scroll( function(){
        jQuery('.hyp-hidden').each( function(i){

            var bottom_of_element = jQuery(this).offset().top + jQuery(this).outerHeight();
            var bottom_of_window = jQuery(window).scrollTop() + jQuery(window).height();
            var duration = 600;

            if( bottom_of_window > bottom_of_element ){
                jQuery(this).animate({'opacity':'1'},1000);
            }

        });
    });

    // jQuery('.hyp-fadeIn').delay(100).animate({'opacity':'1'},300);


});


jQuery(document).ready(function() {

    /*Mobile menu*/
    jQuery( ".mobile_menu .menu>li>a" ).click(function() {
        jQuery( this ).toggleClass( "opened" );
    });


    /**
     * Mobile menu button
     */
    jQuery(".mobMenuBtn").click(function(){
        if(!jQuery("body").hasClass("show-mobile-menu")){
            jQuery("body").addClass("show-mobile-menu");
            setTimeout(function () {
                jQuery("body").addClass("show-mobile-menu-ready");
            }, 100);

        } else {
            jQuery("body").removeClass("show-mobile-menu-ready");
            setTimeout(function () {
                jQuery("body").removeClass("show-mobile-menu");
            }, 150);
        }
        return false;
    });
    jQuery(".mobile_menu .icon-cancel-1").click(function(){
        jQuery("body").removeClass("show-mobile-menu-ready");
        setTimeout(function () {
            jQuery("body").removeClass("show-mobile-menu");
        }, 150);
    });



});

jQuery(document).ready(function() {
    /*Security noopener noreferrer*/
    jQuery('a[target="_blank"]:not(.add_dofollow)').attr(
        {
            'rel': 'nofollow noopener noreferrer',
        }
    );
    jQuery('a.add_dofollow[target="_blank"]').attr(
        {
            'rel': 'noopener noreferrer',
        }
    );
});


//Beta Counter - days left
jQuery(document).ready(function() {
    if(jQuery("div").hasClass("counter-block")){
        var countDownDate = new Date("November, 8, 2022 20:30:00").getTime();

// Update the count down every 1 second
        var x = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("counter-block").innerHTML = "<span>" + days + "</span>" + " days " + "<span>" + hours + "</span>" + " hours " + "<span style='width:15px; display: inline-block;'>" + minutes + "</span>" + " minutes left";

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("counter-block").innerHTML = "November 8-18";
            }
        }, 1000);
    }

});


/*Sub-menu-header*/
jQuery(document).ready(function() {
    jQuery(".menu-item-has-children > a").click(function () {
        jQuery('.sub-menu').toggleClass("opened");
    });
});
jQuery(document).ready(function() {
    jQuery(function(){
        // this will get the full URL at the address bar
        let url = window.location.href;
        jQuery(".menu-item a").each(function() {
            if(url == (this.href)) {
                jQuery(this).closest("li").addClass("active");
            }
        });
    });
});

/*sidebar*/
jQuery(document).ready(function() {
    if(jQuery("nav").hasClass("nav-sidebar")){
        const li=document.querySelectorAll(".nav-sidebar li");
        const contentRow=document.querySelectorAll(".content-row, .homepage .text-block h3, .part__title, .upcoming .text-block h4");
        function activeMenu () {
            setTimeout(function() {
                let len=contentRow.length;
                while(--len && window.scrollY + 200 < contentRow[len].offsetTop) {}
                li.forEach(ltx => ltx.classList.remove("active"));
                li[len].classList.add("active");
            }, 600);
        }
        activeMenu();
        window.addEventListener("scroll", activeMenu);
    }

});

/*Sidebar responsive*/
let countForNav = true;
function expandNav () {
    let expBtn = document.getElementById('collapse-nav');
    let navSidebar = document.getElementById('nav');
    if(countForNav) {
        navSidebar.classList.add('expanded');
        countForNav = false;
    } else {
        navSidebar.classList.remove('expanded');
        countForNav = true;
    }
}

/*Benefits section script*/
jQuery(document).ready(function() {
    jQuery('.benefits-item').on('click', function() {
        jQuery(this).addClass('active');
        jQuery(this).closest('.col-lg-3').find('.benefits-pop-up').addClass('active');
        jQuery(this).closest('.col-lg-3').find('.pop-up-overlay').addClass('active');
        var element = jQuery(this);
        setTimeout( function() {
            jQuery(element).closest('.col-lg-3').find('.benefits-pop-up').addClass('active-2');
            setTimeout( function() {
                jQuery(element).closest('.col-lg-3').find('.benefits-pop-up').addClass('active-3');
            }, 100);
        }, 1000);
    });

    jQuery('div.icon-close').on('click', function() {
        jQuery(this).closest('.col-lg-3').find('.benefits-pop-up').removeClass('active-3').removeClass('active-2').removeClass('active');
        jQuery(this).closest('.col-lg-3').find('.pop-up-overlay').removeClass('active');
        jQuery(this).closest('.col-lg-3').find('.benefits-item').removeClass('active');
    });

    jQuery('div.pop-up-overlay').on('click', function() {
        jQuery(this).closest('.col-lg-3').find('.benefits-pop-up').removeClass('active-3').removeClass('active-2').removeClass('active');
        jQuery(this).closest('.col-lg-3').find('.pop-up-overlay').removeClass('active');
        jQuery(this).closest('.col-lg-3').find('.benefits-item').removeClass('active');
    });
});

jQuery(document).ready(function() {

    /*Accordion*/
    jQuery("#accordion-1>.card:first-child .collapse").addClass('show');
    jQuery("#accordion-1>.card:first-child button").removeClass('collapsed');
});

/*Background after scroll*/
jQuery(document).ready(function() {
    jQuery(window).scroll( function () {
        jQuery(".hyp-header-transparent").addClass('scrolled');
        jQuery(".header-notice-transparent").addClass('scrolled');
        if(jQuery(window).scrollTop() === 0) {
            jQuery(".hyp-header-transparent").removeClass('scrolled');
            jQuery(".header-notice-transparent").removeClass('scrolled');
        }
    });
});

jQuery(document).ready(function() {
    /*Add Calendar*/

    jQuery(".single-gtm-games-events-post .add-cal").click(function(e) {
        jQuery(".single-gtm-games-events-post .show-cal").toggleClass('active');
        var div = jQuery("#btn-block");
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.hide(); // скрываем его
        }
    });

    /*Add Calendar Start*/
    const accordionBtns = document.querySelectorAll(".add-cal");

    accordionBtns.forEach((accordion) => {
        accordion.onclick = function () {
            this.classList.toggle("active");

            let content = this.nextElementSibling;
            console.log(content);

            if (content.style.maxHeight) {
                //this is if the accordion is open
                content.style.maxHeight = null;
            } else {
                //if the accordion is currently closed
                content.classList.toggle("active");
                console.log(content.style.maxHeight);
            }
        };
    });
    /*Add Calendar End*/

});


jQuery(document).ready(function() {

    /*Agency Animated block Slider 1*/
    $('.slick-slider-title-1').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        accesibility: false,
        draggable: false,
        swipe: false,
        touchMove: false,
    });

    /*Slider PDF Template + Single codexes slider*/
    $('.slider-col-pdf-template,.codexes-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // vertical: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        fade: true,
        adaptiveHeight: true
        // accesibility: false,
        // draggable: false,
        // swipe: false,
        // touchMove: false,
    });

    /*Single codexes slider 2*/
    $('.slider-type-center').slick({
        centerMode: true,
        infinite: true,
        variableWidth: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        // focusOnChange: true,
        // focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500
    });

    /*GTM Leaders Slider*/
    $('.gtm-leaders-section .slider-single').slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: true,
        dots: true,
        fade: false,
        autoplay: true,
        asNavFor: '.gtm-leaders-section .slider-nav',
        autoplaySpeed: 5000,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    rows: 2,
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
        // cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)'
    });

    $('.gtm-leaders-section .slider-nav').slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        asNavFor: '.gtm-leaders-section .slider-single',
        dots: true,
        arrows: true,
        centerMode: false,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        focusOnSelect: true,
        centerPadding: '0px',
        loop: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    rows: 2,
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    });
});


/*Під питанням*/
jQuery(window).on("load", function() {
    setTimeout(function(){
        var get_value_email = jQuery("#your-email").val();
        console.log(get_value_email);
        if( get_value_email.length !== 0) {
            jQuery(".default-form .hyp-field_form .your-email").closest('div').children('.placeholder').addClass('active');
        };
        var get_value_your_name = jQuery("#your-name").val();
        console.log(get_value_your_name);
        if( get_value_your_name.length !== 0) {
            jQuery(".default-form .hyp-field_form .your-name").closest('div').children('.placeholder').addClass('active');
        };
        var get_value_message = jQuery("#your-message").val();
        console.log(get_value_message);
        if( get_value_message.length !== 0) {
            jQuery(".default-form .hyp-field_form .your-message").closest('div').children('.placeholder').addClass('active');
        };
    }, 2000);
});
/*Під питанням*/

/*Need Changes by Volod start*/
jQuery(document).ready(function() {

    jQuery('.popup').addClass('hidden');
    setTimeout(function(){
        jQuery('.popup').removeClass('hidden');
    }, 2000);
    setTimeout(function(){
        jQuery('.popup').removeAttr('style');
    }, 1000);
});
/*Need Changes by Volod end*/


/*Need Changes by Volod start*/
/*Redirect to the same page after login*/
jQuery(document).ready(function() {

    let all_links = jQuery("a");
    for(let i=0; i<all_links.length; i++) {

        let current_page = window.location.pathname;
        if( jQuery(all_links[i]).attr("href").indexOf("linkedin-login") != -1 ) {
            jQuery(all_links[i]).attr('data-plugin','nsl');
            jQuery(all_links[i]).attr('data-action','connect');
            jQuery(all_links[i]).attr('data-redirect', current_page + '?logged-in');
            jQuery(all_links[i]).attr('data-provider','linkedin');
            jQuery(all_links[i]).attr('data-popupwidth','600');
            jQuery(all_links[i]).attr('data-popupheight','600');
        }

    }

});
// jQuery(document).ready(function() {
//
//     var pdfTemplateLogin = jQuery(".hc-pdf-template").closest('.page-template').find('.login-block a').text();
//     var pdfTemplateLogin_page = jQuery(".hc-pdf-template").find('a').text();
//     var button_header = jQuery(".hc-pdf-template").closest('.page-template').find('.login-block a');
//     var button_page = jQuery(".hc-pdf-template").find('.btn-block a');
//     if( pdfTemplateLogin == 'Log in' || pdfTemplateLogin_page == 'Continue with LinkedIn' || pdfTemplateLogin == 'Get Whitepaper') {
//         jQuery(button_header).attr('href','/linkedin-login/?loginSocial=linkedin');
//         jQuery(button_header).attr('data-plugin','nsl');
//         jQuery(button_header).attr('data-action','connect');
//         jQuery(button_header).attr('data-redirect','/gtm-tech-stack/?logged-in');
//         jQuery(button_header).attr('data-provider','linkedin');
//         jQuery(button_header).attr('data-popupwidth','600');
//         jQuery(button_header).attr('data-popupheight','600');
//         jQuery(button_page).attr('href','/linkedin-login/?loginSocial=linkedin');
//         jQuery(button_page).attr('data-plugin','nsl');
//         jQuery(button_page).attr('data-action','connect');
//         jQuery(button_page).attr('data-redirect','/gtm-tech-stack/?logged-in');
//         jQuery(button_page).attr('data-provider','linkedin');
//         jQuery(button_page).attr('data-popupwidth','600');
//         jQuery(button_page).attr('data-popupheight','600');
//     }
// });
//
//
// jQuery(document).ready(function() {
//
//     var pdfTemplateLogin_2 = jQuery(".hc-pdf-template").closest('.page-template.pdf-set-meetings').find('.login-block a').text();
//     var pdfTemplateLogin_page_2 = jQuery(".hc-pdf-template").closest('.page-template.pdf-set-meetings').find('a').text();
//     var button_header_2 = jQuery(".hc-pdf-template").closest('.page-template.pdf-set-meetings').find('.login-block a');
//     var button_page_2 = jQuery(".hc-pdf-template").closest('.page-template.pdf-set-meetings').find('.btn-block a');
//     if( pdfTemplateLogin_2 == 'Log in' || pdfTemplateLogin_page_2 == 'Continue with LinkedIn' || pdfTemplateLogin_2 == 'Get Whitepaper') {
//         jQuery(button_header_2).attr('href','/linkedin-login/?loginSocial=linkedin');
//         jQuery(button_header_2).attr('data-plugin','nsl');
//         jQuery(button_header_2).attr('data-action','connect');
//         jQuery(button_header_2).attr('data-redirect','/exactly-how-the-top-b2b-leaders-set-meetings/?logged-in');
//         jQuery(button_header_2).attr('data-provider','linkedin');
//         jQuery(button_header_2).attr('data-popupwidth','600');
//         jQuery(button_header_2).attr('data-popupheight','600');
//         jQuery(button_page_2).attr('href','/linkedin-login/?loginSocial=linkedin');
//         jQuery(button_page_2).attr('data-plugin','nsl');
//         jQuery(button_page_2).attr('data-action','connect');
//         jQuery(button_page_2).attr('data-redirect','/exactly-how-the-top-b2b-leaders-set-meetings/?logged-in');
//         jQuery(button_page_2).attr('data-provider','linkedin');
//         jQuery(button_page_2).attr('data-popupwidth','600');
//         jQuery(button_page_2).attr('data-popupheight','600');
//     }
// });
//
// jQuery(document).ready(function() {
//
//     var pdfTemplateLogin_3 = jQuery(".hc-pdf-template").closest('.page-template.pdf-set-meetings.whitepaper-3').find('.login-block a').text();
//     var pdfTemplateLogin_page_3 = jQuery(".hc-pdf-template").closest('.page-template.pdf-set-meetings.whitepaper-3').find('a').text();
//     var button_header_3 = jQuery(".hc-pdf-template").closest('.page-template.pdf-set-meetings.whitepaper-3').find('.login-block a');
//     var button_page_3 = jQuery(".hc-pdf-template").closest('.page-template.pdf-set-meetings.whitepaper-3').find('.btn-block a');
//     if( pdfTemplateLogin_3 == 'Log in' || pdfTemplateLogin_page_3 == 'Continue with LinkedIn' || pdfTemplateLogin_3 == 'Get Whitepaper') {
//         jQuery(button_header_3).attr('href','/linkedin-login/?loginSocial=linkedin');
//         jQuery(button_header_3).attr('data-plugin','nsl');
//         jQuery(button_header_3).attr('data-action','connect');
//         jQuery(button_header_3).attr('data-redirect','/exactly-how-to-generate-leads-in-a-downturn/?logged-in');
//         jQuery(button_header_3).attr('data-provider','linkedin');
//         jQuery(button_header_3).attr('data-popupwidth','600');
//         jQuery(button_header_3).attr('data-popupheight','600');
//         jQuery(button_page_3).attr('href','/linkedin-login/?loginSocial=linkedin');
//         jQuery(button_page_3).attr('data-plugin','nsl');
//         jQuery(button_page_3).attr('data-action','connect');
//         jQuery(button_page_3).attr('data-redirect','/exactly-how-to-generate-leads-in-a-downturn/?logged-in');
//         jQuery(button_page_3).attr('data-provider','linkedin');
//         jQuery(button_page_3).attr('data-popupwidth','600');
//         jQuery(button_page_3).attr('data-popupheight','600');
//     }
// });
//
// jQuery(document).ready(function() {
//
//     var pdfTemplateLogin_4 = jQuery(".single-codexes-page").closest('.single-codexes').find('.login-block a').text();
//     var pdfTemplateLogin_page_4 = jQuery(".single-codexes-page").closest('.single-codexes').find('a').text();
//     var button_header_4 = jQuery(".single-codexes-page").closest('.single-codexes').find('.login-block a');
//     var button_page_4 = jQuery(".single-codexes-page").closest('.single-codexes').find('.btn-block a');
//     if( pdfTemplateLogin_4 == 'Log in' || pdfTemplateLogin_page_4 == 'Continue with LinkedIn' || pdfTemplateLogin_4 == 'Get Codex') {
//         jQuery(button_header_4).attr('href','/linkedin-login/?loginSocial=linkedin');
//         jQuery(button_header_4).attr('data-plugin','nsl');
//         jQuery(button_header_4).attr('data-action','connect');
//         jQuery(button_header_4).attr('data-redirect','/codexes/codex-xvii-unlearning-sales/?logged-in');
//         jQuery(button_header_4).attr('data-provider','linkedin');
//         jQuery(button_header_4).attr('data-popupwidth','600');
//         jQuery(button_header_4).attr('data-popupheight','600');
//         jQuery(button_page_4).attr('href','/linkedin-login/?loginSocial=linkedin');
//         jQuery(button_page_4).attr('data-plugin','nsl');
//         jQuery(button_page_4).attr('data-action','connect');
//         jQuery(button_page_4).attr('data-redirect','/codexes/codex-xvii-unlearning-sales/?logged-in');
//         jQuery(button_page_4).attr('data-provider','linkedin');
//         jQuery(button_page_4).attr('data-popupwidth','600');
//         jQuery(button_page_4).attr('data-popupheight','600');
//     }
// });
/*Need Changes by Volod end*/