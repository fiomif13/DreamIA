package com.dreamia.dream_ia_backend.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true) // Esto es un salvavidas por si la IA envía campos extra
public class OpcionesCuentoDTO {
    
    private List<String> inicios;
    private List<String> desarrollos;
    private List<String> finales;

    // 1. Constructor vacío (Indispensable)
    public OpcionesCuentoDTO() {
    }

    // 2. Getters y Setters (Indispensables para que Jackson vea los campos)
    public List<String> getInicios() {
        return inicios;
    }

    public void setInicios(List<String> inicios) {
        this.inicios = inicios;
    }

    public List<String> getDesarrollos() {
        return desarrollos;
    }

    public void setDesarrollos(List<String> desarrollos) {
        this.desarrollos = desarrollos;
    }

    public List<String> getFinales() {
        return finales;
    }

    public void setFinales(List<String> finales) {
        this.finales = finales;
    }
}