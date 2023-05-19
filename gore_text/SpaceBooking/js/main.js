let swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

$(document).ready(function() {

    $("#book-park-1").click(function(e) {
      $.ajax({
        type: "POST",
        url: "/generator",
        data: { "length": $("input[name='length']").val() },
        success: function(string) {
          $("#the-string").show();
          document.getElementById("book-park-1").style.backgroundColor = '#f2efa0';
          document.getElementById("book-park-2").style.backgroundColor = '#f90077';
          document.getElementById("book-park-3").style.backgroundColor = '#f90077';
          document.getElementById("book-park-4").style.backgroundColor = '#f90077';
          $("#the-string input").val(string);
        }
      });
      e.preventDefault();
    });

    $("#book-park-2").click(function(e) {
      $.ajax({
        type: "POST",
        url: "/generator",
        data: { "length": $("input[name='length']").val() },
        success: function(string) {
          $("#the-string").show();
          document.getElementById("book-park-2").style.backgroundColor = '#f2efa0';
          document.getElementById("book-park-1").style.backgroundColor = '#f90077';
          document.getElementById("book-park-3").style.backgroundColor = '#f90077';
          document.getElementById("book-park-4").style.backgroundColor = '#f90077';
          $("#the-string input").val(string);
        }
      });
      e.preventDefault();
    });

    $("#book-park-3").click(function(e) {
      $.ajax({
        type: "POST",
        url: "/generator",
        data: { "length": $("input[name='length']").val() },
        success: function(string) {
          $("#the-string").show();
          document.getElementById("book-park-3").style.backgroundColor = '#f2efa0';
          document.getElementById("book-park-2").style.backgroundColor = '#f90077';
          document.getElementById("book-park-1").style.backgroundColor = '#f90077';
          document.getElementById("book-park-4").style.backgroundColor = '#f90077';
          $("#the-string input").val(string);
        }
      });
      e.preventDefault();
    });

    $("#book-park-4").click(function(e) {
      $.ajax({
        type: "POST",
        url: "/generator",
        data: { "length": $("input[name='length']").val() },
        success: function(string) {
          $("#the-string").show();
          document.getElementById("book-park-4").style.backgroundColor = '#f2efa0';
          document.getElementById("book-park-2").style.backgroundColor = '#f90077';
          document.getElementById("book-park-3").style.backgroundColor = '#f90077';
          document.getElementById("book-park-1").style.backgroundColor = '#f90077';
          $("#the-string input").val(string);
        }
      });
      e.preventDefault();
    });

});

