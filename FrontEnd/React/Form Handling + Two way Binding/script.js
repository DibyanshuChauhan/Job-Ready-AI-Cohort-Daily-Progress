document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    var input = document.querySelector('input[name="gender"]');
    console.log(input.value);
})