package com.curso.curso.dao;

import com.curso.curso.models.Articulos;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ArticuloDao {

    @Transactional
    Articulos getArticulo(Long id);

    List<Articulos> getArticulos();

    void eliminar(Long id);

    void registrarArticulos(Articulos articulos);
}
