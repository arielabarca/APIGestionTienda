package com.curso.curso.dao;

import com.curso.curso.models.Proveedores;

import java.util.List;

public interface ProveedorDao {
    List<Proveedores> getProveedores();

    void registrarProveedores(Proveedores proveedores);

    void eliminar(Long id);
}
