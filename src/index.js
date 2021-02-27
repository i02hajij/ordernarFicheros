const fs = require('fs');

// Directorio origen
const origen = 'E:/Pocophone/Camera';
const raizDestino = 'E:/Fotos';

//passsing directoryPath and callback function
fs.readdir(origen, (err, files) => {
  if (err) {
    return console.log('Error al leer directorio origen ' + err);
  }
  //listing all files using forEach
  files.forEach((file) => {
    // Obtengo el año y mes del fichero
    const ano = file.toString().substr(4, 4);
    const mes = file.toString().substr(8, 2).padStart(2, 0);

    // el año es incorrecto
    if (ano < 2017 || ano > 2021) {
      console.log('Año incorrecto - Fichero ' + file);
    } else if (mes < 1 || mes > 12) {
      console.log('Mes incorrecto - Fichero ' + file);
    } else {
      // no hay error, por lo que monto la carpeta destino
      const destino = raizDestino + '/' + ano + '/' + mes;

      // compruebo si existe el directorio
      const existe = fs.existsSync(destino);
    
      // Si no existe, lo creo
      if (!existe) {
        fs.mkdirSync(destino, { recursive: true }, (err) => {
          console.log('Error creando directorio ' + destino + ' - ' + err);
        });
      }

      // copio el archivo a su carpeta
      fs.copyFileSync(origen + '/' + file, destino + '/' + file, fs.constants.COPYFILE_EXCL);
    }

    console.log(file + '- ' + ano + ' - ' + mes);
  });
});
