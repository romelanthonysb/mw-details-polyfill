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
// 
// Tested on Microsoft Edge (12) and Google Chrome.
//
// 2015-10-14
// Try to use the "open" attribute instead of "det-poly-closed".
// This means some <details> tags should be left open (displayed) when
// the program starts up.

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
    // For each detail block, check to see if it is "open"
    // If not, hide it
    $dets.each(function() {
      $(this).children('summary').nextAll().wrapAll('<div class="det-poly-rest"></div>');
      if (!($(this).attr('open'))) {
        $(this).children('.det-poly-rest').hide();
      }
    });
    // Add the correct indicator to the beginning of the summary.
    $sums.prepend('<span class="det-poly-pm"></span>');
    $sums.each(function() {
      if (!($(this).parent().attr('open'))) {
        $(this).children('.det-poly-pm').text(' + ');
      } else {
        $(this).children('.det-poly-pm').text(' - ');
      }
    });
//    $('.det-poly-pm').text(' + ');

    // Toggle the details when the user clicks the summary
    // Code may fail if we have details inside of other details
    $sums.click(function() {
      // Is the detail not "open"?
      if (!$(this).parent().attr('open')) {
        // If closed, open it!
        $(this).parent().find('.det-poly-rest').show();
        $(this).find('.det-poly-pm').text(' - ');
        $(this).parent().attr('open', 'open');
      } else {
        // If opened, close it!
        $(this).parent().find('.det-poly-rest').hide();
        $(this).find('.det-poly-pm').text(' + ');
        $(this).parent().removeAttr('open');
      }
    });
  }
});


