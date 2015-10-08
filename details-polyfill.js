// Polyfill to enable HTML5 <details> & <summary> tags
// by Romel Anthony S. Bismonte (ras.bismonte@gmail.com)
// Use with jQuery
//
// Assumptions & Limitations
// 1. All <details> markups are on the same level--no <details> are inside of
//    other <details>.
// 2. The content of <details> outside <summary> are enclosed in HTML tags--
//    not plain text.
// 3. Uses "+" and "-" instead of the triangular arrows I saw in Chrome.
// 4. Logic is backwards of actual HTML5: Attribute 'det-poly-closed' is 
//    set if details are hidden and removed if details are shown. Contrast
//    with <details open> if shown and <details> (attribute removed) if
//    hidden.
// 
// Tested on Microsoft Edge (12) and Google Chrome.

$(function() {
  // Check if browser supports <details> tags
  var supportsDetails = ('open' in document.createElement('details'));
  if (supportsDetails === false) {
    // Implement the behavior of <details> and <summary>
    // 1. Add an indicator (here, "+" and "-") to the summary.
    // 2. Hide the info in the detail.
    // 3. Show the info in the summary.
    // 4. When the user clicks the summary:
    // 4a. Toggle the indicator between + and -.
    // 4b. Toggle the visibility of the detail.

    // Setup when the page loads
    // Grab a list of all <details> & <summary> elements in this page
    var $dets = $('details');
    var $sums = $('summary');
    // Get the older browser to treat these as block elements
    $dets.css('display', 'block');
    $sums.css('display', 'block');
    // Add the "open" attribute to each detail and set it to false
    $dets.attr('det-poly-closed', 'det-poly-closed');
    // then actually hide the details
    // Just using $dets.hide() will hide the summary, too!
    $sums.each(function() {
      $(this).nextAll().wrapAll('<div class="det-poly-rest"></div>');
    });
    $('.det-poly-rest').hide();

    // Add a "+" (closed) indicator to the beginning of the summary.
    $sums.prepend('<span class="det-poly-pm"></span>');
    $('.det-poly-pm').text(' + ');

    // Toggle the details when the user clicks the summary
    // Code may fail if we have details inside of other details
    $sums.click(function() {
      if ($(this).parent().attr('det-poly-closed')) {
        // If closed, open it!
        $(this).parent().find('.det-poly-rest').show();
        $(this).find('.det-poly-pm').text(' - ');
        $(this).parent().removeAttr('det-poly-closed');
      } else {
        // If opened, close it!
        $(this).parent().find('.det-poly-rest').hide();
        $(this).find('.det-poly-pm').text(' + ');
        $(this).parent().attr('det-poly-closed', 'det-poly-closed');
      }
    });
  }
});


