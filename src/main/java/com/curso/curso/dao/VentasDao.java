package com.curso.curso.dao;

import com.curso.curso.models.Ventas;

import java.util.List;

public interface VentasDao {
    List<Ventas> getVentas();

    void registrarVentas(Ventas ventas);

    void eliminar(Long id);
}
