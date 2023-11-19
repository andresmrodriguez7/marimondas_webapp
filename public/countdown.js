const getTime = (dateTo) => {
    let now = new Date(),
        time = (new Date(dateTo) - now + 1000) / 1000,
        seconds = ("0" + Math.floor(time % 60)).slice(-2),
        minutes = ("0" + Math.floor((time / 60) % 60)).slice(-2),
        hours = ("0" + Math.floor((time / 3600) % 24)).slice(-2),
        days = Math.floor(time / (3600 * 24));

    return {
        seconds,
        minutes,
        hours,
        days,
        time,
    };
};

const countdown = (dateTo, countdown1) => {
    const item = document.getElementById(countdown);
    const timerUpdate = setInterval(() => {
        let currenTime = getTime(dateTo);
        item.innerHTML = `
            <div class="row">
                <div class="col-lg-2">
                    <div class="countdown-container">
                        <div class="number">
                            ${currenTime.days}
                        </div>
                        <div class="concept">
                            Días
                        </div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="countdown-container">
                        <div class="number">
                            ${currenTime.hours}
                        </div>
                        <div class="concept">
                            Horas
                        </div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="countdown-container">
                        <div class="number">
                            ${currenTime.minutes}
                        </div>
                        <div class="concept">
                            Minutos
                        </div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="countdown-container">
                        <div class="number">
                            ${currenTime.seconds}
                        </div>
                        <div class="concept">
                            Segundos
                        </div>
                    </div>
                </div>
            </div>`;

        if (currenTime.time <= 1) {
            clearInterval(timerUpdate);
            alert("Fin de la cuenta " + element);
        }
    }, 1000);
};
// obtenemos la fecha actual
var date = new Date("February 18, 2023 00:00:00");
var new_date1 = new Date(date);

// Obtenemos un numero aleatorio entre 1 y 12
var add_hours = 0;

// Obtenemos un numero aleatorio entre 1 y 60
var add_days = 0;

// Obtenemos un numero aleatorio entre 1 y 13
var add_months = 0;

// Incrementamos las horas
new_date1.setDate(date.getHours() + add_hours);
// Incrementamos los dias
new_date1.setDate(date.getDate() + add_days);
// Incrementamos los meses
new_date1.setMonth(date.getMonth() + add_months);
countdown(new_date1, "countdown1");