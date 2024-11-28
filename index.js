import { createServer } from 'node:http';
import 'dotenv/config';
import app from './app/index.app.js';

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
