const {
    rejects
} = require('assert')
const {
    log
} = require('console')
const fs = require('fs')
const {
    get
} = require('http')
const {
    resolve
} = require('path')

let listado_tareas = []

const guardarInDB = () => {

    return new Promise((resolve, reject) => {
        let data = JSON.stringify(listado_tareas)
        fs.writeFile('db/data.json', data,
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(`tarea creada correctamente`)
                }
            })
    })

}

const cargarDB = () => {
    //?hay varias formas de leer un archivos json podriamos hacer una peticion http para leer el acrchivo pero como estamos en un lenguaje de back, concretamente en Node podemos leer el archivo directamente con un require, node al detectar que es un archivo json lo serializa automaticamente y lo convierte en un objeto

    //*si tenemos el json vacio va a saltar una excepcion por eso hacemos esto en el cath
    try {
        listado_tareas = require('../db/data.json')
    } catch (error) {
        listado_tareas = []
    }

}
const crearTarea = (titulo, descripcion) => {

    cargarDB()
    let tarea = {
        titulo: titulo,
        descripcion: descripcion,
        completado: false
    }

    listado_tareas.push(tarea)
    //console.log(listado_tareas)
    guardarInDB()
        .then(res => console.log(res))
        .catch(err => console.log(err))
    return tarea
}

const getTareas = () => {
    if (listado_tareas.length == 0) {
        cargarDB()
        return listado_tareas
    } else {
        //*este es la variable global
        return listado_tareas
    }

}



const actualizarTarea = (titulo, completado) => {
    //console.log(completado)
    listado_tareas = getTareas()
    //?esto de bajo seria el metodo de toda la vida
    /* for (const i in listado_tareas) {
        if (listado_tareas[i].titulo == titulo) {
            listado_tareas[i].completado = completado
            console.log(listado_tareas[i].titulo)
            guardarInDB()
            console.log(`estado de la tarea "${listado_tareas[i].titulo}" actualizado correctamente`)
            break
        }
        console.log('eeeeee')
    } 
    throw new Error('No se ha entontrado ninguna tarea con el titulo espeficicado')
    */
    //? js nos facitilita un poco las cosas, este metodo nos devuelve el indice que cumple con la condicion, recorre el array que le pasemos
    let index = listado_tareas.findIndex(tarea => tarea.titulo === titulo)

    //* si nos ha devuelto un indice mayor o igual que 0 es que se ha encontrado la tarea buscada
    if (index >= 0) {
        listado_tareas[index].completado = completado
        guardarInDB()
        console.log(`estado de la tarea "${listado_tareas[index].titulo}" actualizado correctamente`)
    } else {
        throw new Error('No se ha entontrado ninguna tarea con el titulo espeficicado')
    }
}

const borrarTarea = (titulo) => {
    listado_tareas = getTareas()
    let index = listado_tareas.findIndex(tarea => tarea.titulo === titulo)
    if (index >= 0) {
        listado_tareas.splice(index, 1)
        guardarInDB()
        console.log(`tarea ${titulo} elimnada correctamente`)
    } else {
        throw new Error('No se ha entontrado ninguna tarea con el titulo espeficicado')
    }

}


const getTareasFiltradas = (completado) => {
    listado_tareas = getTareas()
    let is_completado = (completado === 'true');
    let filterList = listado_tareas.filter(tarea => {
        if (tarea.completado === is_completado) {
            return tarea
        }
    })
    return filterList
}
module.exports = {
    crearTarea: crearTarea,
    getTareas,
    actualizarTarea,
    borrarTarea,
    getTareasFiltradas

}