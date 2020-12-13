const {
    argv
} = require('./config/yargs')

const {
    crearTarea,
    getTareas,
    actualizarTarea,
    borrarTarea,
    getTareasFiltradas
} = require('./toDo/toDo')

const {
    colors
} = require('colors')


//* la app que vamos a crear debe poder realizar estas funcionalididades 
//*crear una tarea(y poder añadir una descruipcion??)-> ej: node app crear --titulo "ir a comprar"

//*poder listar todas las tareas de que tenemos->ej: node app listar

//* podeer actualizar el estado(si esta completada o  no) de una tarea-> ej: node app atualizar --titulo --estado true


let comando = argv._[0]

switch (comando) {
    case 'crear':
        console.log('Vas a crear una tarea')

        let tarea = crearTarea(argv.titulo, argv.d)

        break
    case 'listar':
        console.log('Vas a listar una tarea')
        //console.log(argv.completado)
        if (argv.completado) {

            let listado_tareas = getTareasFiltradas(argv.completado)
            for (const i in listado_tareas) {

                console.log('----------------------------------'.green)
                console.log(`tarea->${listado_tareas[i].titulo}`)
                if (listado_tareas[i].descripcion != '') {
                    console.log(`con descripcion${listado_tareas[i].descripcion}`)
                }
                console.log(`completada??->${listado_tareas[i].completado}`)
            }
        } else {
            let listado_tareas = getTareas()
            for (const i in listado_tareas) {

                console.log('----------------------------------'.green)
                console.log(`tarea->${listado_tareas[i].titulo}`)
                if (listado_tareas[i].descripcion != '') {
                    console.log(`con descripcion${listado_tareas[i].descripcion}`)
                }
                console.log(`completada??->${listado_tareas[i].completado}`)
            }

        }
        break
    case 'actualizar':
        console.log('Vas a actualizar una tarea')
        console.log(argv.completado)
        actualizarTarea(argv.titulo, argv.completado)
        break
    case 'borrar':
        console.log(`vas a borrar a la tarea ${argv.titulo}`)
        borrarTarea(argv.titulo)
        break
    default:
        console.log('error el comando introducido no se reconoce como una operacion disponible')
        break
}