package com.curso.curso.controllers;

import com.curso.curso.dao.ComprasDao;
import com.curso.curso.models.Compras;
import com.curso.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ComprasController {

    @Autowired
    private ComprasDao comprasDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validartoken(String token){
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/compras", method = RequestMethod.GET)
    public List<Compras> getCompras (@RequestHeader(value = "Authorization") String token){
        if(!validartoken((token))){
            return null;
        }
        return comprasDao.getCompras();
    }

    @RequestMapping(value = "api/compras", method = RequestMethod.POST)
    public void registrarCompras (@RequestBody Compras compras){

        comprasDao.registrarCompras(compras);
    }

    @RequestMapping(value = "api/compras/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long id){
        if(!validartoken((token))){
            return ;
        }
        comprasDao.eliminar(id);
    }
}
