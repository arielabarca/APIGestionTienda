package com.curso.curso.controllers;

import com.curso.curso.dao.ProveedorDao;
import com.curso.curso.models.Proveedores;
import com.curso.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProveedorController {

    @Autowired
    private ProveedorDao proveedorDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validartoken(String token){
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/proveedores", method = RequestMethod.GET)
    public List<Proveedores> getProveedores (@RequestHeader(value = "Authorization") String token){
        if(!validartoken((token))){
            return null;
        }
        return proveedorDao.getProveedores();
    }

    @RequestMapping(value = "api/proveedores", method = RequestMethod.POST)
    public void registrarProveedores (@RequestBody Proveedores proveedores){

        proveedorDao.registrarProveedores(proveedores);
    }

    @RequestMapping(value = "api/proveedores/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long id){
        if(!validartoken((token))){
            return ;
        }
        proveedorDao.eliminar(id);
    }
}
