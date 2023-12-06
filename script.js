function obteberTiempoFaltante(fechaLimite) {
    let ahora = new Date();

    let tiempoFaltante = (new Date(fechaLimite) - ahora + 1000) / 1000;

    let segundosFaltantes = ('0'+ Math.floor(tiempoFaltante % 60)).slice(-2);
    let minutosFaltantes = ('0'+ Math.floor(tiempoFaltante / 60 % 60)).slice(-2);
    let horasFaltantes = ('0'+ Math.floor(tiempoFaltante / 3600 % 24)).slice(-2);
    let diasFaltantes = ('0'+ Math.floor(tiempoFaltante / (3600 * 24))).slice(-2);

    //Retornar todos los valores convertidos
    return{
        segundosFaltantes,
        minutosFaltantes,
        horasFaltantes,
        diasFaltantes,
        tiempoFaltante,
    }
    
};

//console.log(obteberTiempoFaltante('Dec 25 2023 00:00:00 GMT-0500'))

//UN INTERVALO PARA QUE LA FUNCION SE REFRESQUE
function cuentaRegresiva(tiempoFaltante, reloj, mensaje) {
    const e = document.getElementById(reloj);
    const botonPlay = document.getElementById('play');
    const botonPause = document.getElementById('pause');
    const hora = document.getElementById('hr');
    const dia = document.getElementById('di');
    const minuto = document.getElementById('mi');
    const segundo = document.getElementById('se');


    const tiempoActual = setInterval( () =>{
        let t =obteberTiempoFaltante(tiempoFaltante);
        e.innerHTML=`<p>Falta para la Navidad</p>`;
        //e.innerHTML = `${t.diasFaltantes}d:${t.horasFaltantes}h:${t.minutosFaltantes}m:${t.segundosFaltantes}s`;
        dia.innerHTML = t.diasFaltantes;
        hora.innerHTML = t.horasFaltantes;
        minuto.innerHTML = t.minutosFaltantes;
        segundo.innerHTML = t.segundosFaltantes;


        //Validación para que cuando llegue a la meta se detenga la actualización de Pagina
        if (t.tiempoFaltante<1) {
            //Detenemos el calendario
            dia.innerHTML = `00`;
            hora.innerHTML = `00`;
            minuto.innerHTML = `00`;
            segundo.innerHTML = `00`;

            //Traemos y asignamos a las variables los elemntos y el sonido
            let music = new Audio('./sound/music.mp3');
            let img = document.getElementById('papaNoel');

            //Cambiamos el estilo de los botones
            botonPause.classList.add('on');
            botonPlay.classList.add('on');

            //Acabar con el intervalo
            clearInterval(tiempoActual);


            //Actualize mensaje
            e.innerHTML = `<p>${mensaje}</p>`;

            //Cambiamos la imagen por el gift
            img.classList.add('gif');

            botonPlay.addEventListener('click', ()=>{
                music.play();
            });

            botonPause.addEventListener('click', ()=>{
                music.pause();
            });
        }else{
            //Cambiamos el estilo de los botones
            botonPause.classList.remove('on');
            botonPlay.classList.remove('on');
        }
    }, 1000);  
};

//Llamamos la funcion con los parametros que necesita
cuentaRegresiva("Dec 25 2023 00:00:00 GMT-0500", 'cuentaRegresiva', '¡Feliz Navidad!');