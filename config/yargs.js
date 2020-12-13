const titulo = {
    demand: true,
    alias: 't',
    desc: 'titulo de la tarea por hacer'
}


const opciones_crear = {
    titulo: titulo,
    descripcion: {
        demand: false,
        default: '',
        alias: 'd',
        desc: 'descripcion opcional para la tarea'
    }
}

const opciones_actualizar = {
    titulo: titulo,
    completado: {
        demand: true,
        default: true,
        alias: 'c ',
        desc: 'indicar mediante true o false si la tarea esta compleatada'
    }
}

const opciones_listar = {
    completado: {
        demand: false,
        alias: 'c ',
        desc: 'filtrar las tareas mediante si estan completadas o no(true o false)'
    }
}

const opciones_borrar = {
    titulo: titulo
}

const argv = require('yargs')
    .command('crear', 'crea una nueva tarea con el titlo especificado y una descripcion opcional', opciones_crear)
    .command('listar', 'lista todas las tareas', opciones_listar)
    .command('actualizar', 'actualiza el estado de la tarea especificada por titulo', opciones_actualizar)
    .command('borrar', 'borra la tarea espeficicada por el titulo', opciones_borrar)
    .help()
    .argv


module.exports = {
    argv: argv
}