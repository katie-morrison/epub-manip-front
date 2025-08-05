let backend

if (process.env.BACKEND) {
    backend = process.env.BACKEND
} else {
    backend = 'http://localhost:3001'
}

export default backend