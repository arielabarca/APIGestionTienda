package com.curso.curso.dao;

import com.curso.curso.models.Compras;

import java.util.List;

public interface ComprasDao {
    List<Compras> getCompras();

    void registrarCompras(Compras compras);

    void eliminar(Long id);
}
