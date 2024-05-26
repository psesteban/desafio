import fs from 'fs'
import path from 'path'

const getHtml = (req, res) => {
  const filePath = path.resolve('index.html')
  res.sendFile(filePath)
}

const getCanciones = (req, res) => {
  try {
    const canciones = JSON.parse(
      fs.readFileSync('repertorio.json', 'utf8')
    )
    res.status(200).json(canciones)
  } catch (error) {
    res.status(500).json({ message: 'Hay un error' })
  }
}

const postCanciones = (req, res) => {
  try {
    const cancion = req.body
    const repertorio = JSON.parse(fs.readFileSync('repertorio.json'))
    repertorio.push(cancion)
    fs.writeFileSync('repertorio.json', JSON.stringify(repertorio, null, 2))
    res.status(201).send('Canción creada con éxito!')
  } catch (error) {
    res.status(500).json({ message: 'El recurso no esta disponible' })
  }
}

const editCancion = (req, res) => {
  const { id } = req.params
  const { titulo, artista, tono } = req.body
  try {
    const repertorio = JSON.parse(fs.readFileSync('repertorio.json'))
    const index = repertorio.findIndex(cancion => cancion.id === parseInt(id))
    if (index !== -1) {
      repertorio[index] = { id: parseInt(id), titulo, artista, tono }
    }
    fs.writeFileSync('repertorio.json', JSON.stringify(repertorio, null, 2))
    res.status(201).send('Canción editada con éxito!')
  } catch (error) {
    console.error(error)
    res.status(500).json('error: error del repertorio')
  }
}

const deleteCancion = (req, res) => {
  try {
    const { id } = req.params
    const repertorio = JSON.parse(fs.readFileSync('repertorio.json'))
    const index = repertorio.findIndex(cancion => cancion.id === parseInt(id))
    if (index !== -1) {
      repertorio.splice(index, 1)
    }
    fs.writeFileSync('repertorio.json', JSON.stringify(repertorio, null, 2))
    res.status(201).send('Canción eliminada con éxito!')
  } catch (error) {
    console.error(error)
    res.status(500).json(req.body.id)
  }
}

export { getHtml, getCanciones, postCanciones, editCancion, deleteCancion }
