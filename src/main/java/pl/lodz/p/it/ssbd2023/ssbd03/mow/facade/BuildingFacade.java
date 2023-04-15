package pl.lodz.p.it.ssbd2023.ssbd03.mow.facade;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import pl.lodz.p.it.ssbd2023.ssbd03.config.AbstractFacade;
import pl.lodz.p.it.ssbd2023.ssbd03.mow.Building;

@Stateless
public class BuildingFacade extends AbstractFacade<Building> {
    @PersistenceContext(unitName = "ssbd03mow")
    private EntityManager em;
    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    public BuildingFacade() {
        super(Building.class);
    }
    @Override
    public void edit(Building entity) {
        super.edit(entity);
    }

    @Override
    public void create(Building entity) {
        super.create(entity);
    }

    @Override
    public void remove(Building entity) {
        super.remove(entity);
    }
}
