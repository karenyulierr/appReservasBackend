import { services } from '../data/beautyServices.js';
import Services from '../models/Services.js';

import { validateObjectId, handleNotFoundError } from '../utils/index.js';

const createService = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({
            msg: error.message
        })
    }
    try {
        const service = new Services(req.body);
        await service.save();
        res.json({
            msg: 'El servicio se creo correctamente'
        });
    } catch (error) {
        console.log(error)
    }
}

const getServices = (req, res) => {
    res.json(services);
}

const getServicesById = async (req, res) => {
    const { id } = req.params;

    //Validar un objecto id
    if (validateObjectId(id, res)) return
    //Validar que exista
    const service = await Services.findById(id);
    if (!service) {
        return handleNotFoundError('El servicio no existe', res)
    }
    //Mostrar el servicio
    res.json(service);
}

const updateService = async (req, res) => {
    const { id } = req.params;

    //Validar un objecto id
    if (validateObjectId(id, res)) return
    //Validar que exista
    const service = await Services.findById(id);
    if (!service) {
        return handleNotFoundError('El servicio no existe', res)
    }

    //Escribimos en el objecto los valores nuevos
    service.name = req.body.name || service.name
    service.price = req.body.price || service.price

    try {
        await service.save();
        res.json({
            msg: 'El servicio se actualizó correctamente'
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteService = async (req, res) => {
    const { id } = req.params;

    //Validar un objecto id
    if (validateObjectId(id, res)) return
    //Validar que exista
    const service = await Services.findById(id);
    if (!service) {
        return handleNotFoundError('El servicio no existe', res)
    }
    try {
        await service.deleteOne();
        res.json({
            msg: 'El servicio se elimino correctamente'
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    createService,
    getServices,
    getServicesById,
    updateService,
    deleteService
}