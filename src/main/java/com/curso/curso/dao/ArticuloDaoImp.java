package com.curso.curso.dao;

import com.curso.curso.models.Articulos;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class ArticuloDaoImp implements ArticuloDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public Articulos getArticulo(Long id) {
        return entityManager.find(Articulos.class, id);
    }


    @Override
    @Transactional
    public List<Articulos> getArticulos() {
        String query = "FROM Articulos";
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    public void eliminar(Long id) {
        Articulos articulos = entityManager.find(Articulos.class, id);
        entityManager.remove(articulos);
    }

    @Override
    public void registrarArticulos(Articulos articulos)  {
        entityManager.merge(articulos);
    }

}
