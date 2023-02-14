package com.curso.curso.controllers;

import com.curso.curso.dao.VentasDao;
import com.curso.curso.models.Ventas;
import com.curso.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VentasController {

    @Autowired
    private VentasDao ventasDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validartoken(String token){
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/ventas", method = RequestMethod.GET)
    public List<Ventas> getVentas (@RequestHeader(value = "Authorization") String token){
        if(!validartoken((token))){
            return null;
        }
        return ventasDao.getVentas();
    }

    @RequestMapping(value = "api/ventas", method = RequestMethod.POST)
    public void registrarVentas (@RequestBody Ventas ventas){

        ventasDao.registrarVentas(ventas);
    }

    @RequestMapping(value = "api/ventas/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long id){
        if(!validartoken((token))){
            return ;
        }
        ventasDao.eliminar(id);
    }
}
