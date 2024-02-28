document.addEventListener("DOMContentLoaded", () => {
   
    let updateTime = () => {
        const now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');
        let currentTime = `${hours}:${minutes}:${seconds}`;
        document.getElementById("Time").textContent = currentTime;

    };

    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);

   
    let startButton = document.getElementById("start-button");
    let resetButton = document.getElementById("reset-button");
    let secondsInput = document.getElementById("seconds");
    let minutesInput = document.getElementById("minutes");
    let hoursInput = document.getElementById("hours");
    let countdownInterval;



    startButton.addEventListener("click", () => {
        clearInterval(countdownInterval);
    
        // Convert excess seconds and minutes to minutes and hours respectively
        let totalSeconds = parseInt(secondsInput.value || 0) + parseInt(minutesInput.value || 0) * 60 + parseInt(hoursInput.value || 0) * 3600;
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;
    
        countdownInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                hours = Math.floor(totalSeconds / 3600);
                minutes = Math.floor((totalSeconds % 3600) / 60);
                seconds = totalSeconds % 60;
    
                secondsInput.value = seconds.toString().padStart(2, '0');
                minutesInput.value = minutes.toString().padStart(2, '0');
                hoursInput.value = hours.toString().padStart(2, '0');
            } else {
                clearInterval(countdownInterval);
                document.getElementById("alarm-sound").play();
            }
        }, 1000);
    });

    resetButton.addEventListener("click", () => {
        clearInterval(countdownInterval);
        secondsInput.value = '';
        minutesInput.value = '';
        hoursInput.value = '';
    });
});