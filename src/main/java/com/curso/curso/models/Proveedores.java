package com.curso.curso.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;


@Entity
@Table(name = "proveedores")
@ToString @EqualsAndHashCode
/*
 * TODO cambiar columnas de - y _
 * TODO Convertir Snake case hacia camel case
 */
public class Proveedores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long id;

    @Getter @Setter @Column(name = "razon-social")
    private String razonSocial;

    @Getter @Setter @Column(name = "telefono")
    private String telefono;

    @Getter @Setter @Column(name = "email")
    private String email;

    @Getter @Setter @Column(name = "fecha-alta")
    private Date fechaAlta;

    @Getter @Setter @Column(name = "descripcion")
    private String descripcion;

}