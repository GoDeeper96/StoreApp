import FileStructure from "../Models/FileStructure";


const InitialFolder = [
    new FileStructure(
        "f1",
        "example1",
        "Ejemplo",
        "Barto Mamani",
        [],
        new Date().toJSON().slice(0,10).replace(/-/g,'/'),
    ),
    new FileStructure(
        "f2",
        "example1",
        "Ejemplo",
        "Mr Mamani",
        [],
        new Date().toJSON().slice(0,10).replace(/-/g,'/'),
    ),
]

export default InitialFolder