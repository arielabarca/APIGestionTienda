package com.curso.curso.dao;

import com.curso.curso.models.Compras;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class ComprasDaoImp implements ComprasDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<Compras> getCompras() {
        String query = "FROM Compras";
        return entityManager.createQuery(query).getResultList();

    }

    @Override
    public void eliminar(Long id) {
        Compras compras = entityManager.find(Compras.class, id);
        entityManager.remove(compras);
    }

    @Override
    public void registrarCompras(Compras compras)  {
        entityManager.merge(compras);
    }

}
