package com.curso.curso.dao;

import com.curso.curso.models.Ventas;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class VentasDaoImp implements VentasDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<Ventas> getVentas() {
        String query = "FROM Ventas";
        return entityManager.createQuery(query).getResultList();

    }

    @Override
    public void eliminar(Long id) {
        Ventas ventas = entityManager.find(Ventas.class, id);
        entityManager.remove(ventas);
    }

    @Override
    public void registrarVentas(Ventas ventas)  {
        entityManager.merge(ventas);
    }

}
