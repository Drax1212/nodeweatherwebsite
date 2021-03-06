const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    messageOne.innerHTML = "Loading...";

    messageTwo.textContent = "";
    axios
        .get(`/weather?address=${input.value}`)
        .then((res) => {
            if (res.data.error) {
                messageOne.textContent = res.data.error;
                return;
            }
            messageOne.textContent = res.data.location;
            messageTwo.textContent = res.data.forecast;
        });
});