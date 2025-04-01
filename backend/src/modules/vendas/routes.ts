
import { Router } from 'express';
import { ClienteController } from './controllers/cliente.controller';
import { PedidoController } from './controllers/pedido.controller';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();
const clienteController = new ClienteController();
const pedidoController = new PedidoController();

// Rotas protegidas
router.use(authMiddleware);

// Clientes
router.get('/clientes', clienteController.listarClientes);
router.get('/clientes/:id', clienteController.obterCliente);
router.post('/clientes', clienteController.criarCliente);
router.put('/clientes/:id', clienteController.atualizarCliente);
router.delete('/clientes/:id', clienteController.excluirCliente);

// Pedidos
router.get('/pedidos', pedidoController.listarPedidos);
router.get('/pedidos/:id', pedidoController.obterPedido);
router.post('/pedidos', pedidoController.criarPedido);
router.patch('/pedidos/:id/status', pedidoController.atualizarStatusPedido);
router.delete('/pedidos/:id', pedidoController.excluirPedido);

export default router;
