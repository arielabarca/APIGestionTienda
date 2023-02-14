package com.curso.curso.dao;

import com.curso.curso.models.Proveedores;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class ProveedorDaoImp implements ProveedorDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<Proveedores> getProveedores() {
        String query = "FROM Proveedores";
        return entityManager.createQuery(query).getResultList();

    }

    @Override
    public void eliminar(Long id) {
        Proveedores proveedores = entityManager.find(Proveedores.class, id);
        entityManager.remove(proveedores);
    }

    @Override
    public void registrarProveedores(Proveedores proveedores)  {
        entityManager.merge(proveedores);
    }

}
