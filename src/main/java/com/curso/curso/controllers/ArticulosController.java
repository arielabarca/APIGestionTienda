package com.curso.curso.controllers;

import com.curso.curso.dao.ArticuloDao;
import com.curso.curso.models.Articulos;
import com.curso.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ArticulosController {

    @Autowired
    private ArticuloDao articuloDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validartoken(String token){
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/articulo/{id}", method = RequestMethod.GET)
    public Articulos getArticulo (@RequestHeader(value = "Authorization") String token, Long id){
        if(!validartoken((token))){
            return null;
        }
        return articuloDao.getArticulo(id);
    }

    @RequestMapping(value = "api/articulos", method = RequestMethod.GET)
    public List<Articulos> getArticulos (@RequestHeader(value = "Authorization") String token){
        if(!validartoken((token))){
            return null;
        }
        return articuloDao.getArticulos();
    }

    @RequestMapping(value = "api/articulos", method = RequestMethod.POST)
    public void registrarArticulos (@RequestBody Articulos articulos){

        articuloDao.registrarArticulos(articulos);
    }

    @RequestMapping(value = "api/articulos/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long id){
        if(!validartoken((token))){
            return ;
        }
        articuloDao.eliminar(id);
    }
}
