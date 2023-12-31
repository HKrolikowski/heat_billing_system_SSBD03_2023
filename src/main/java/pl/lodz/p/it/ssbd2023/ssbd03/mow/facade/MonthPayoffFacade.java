package pl.lodz.p.it.ssbd2023.ssbd03.mow.facade;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ejb.Stateless;
import jakarta.ejb.TransactionAttribute;
import jakarta.ejb.TransactionAttributeType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import pl.lodz.p.it.ssbd2023.ssbd03.common.AbstractFacade;
import pl.lodz.p.it.ssbd2023.ssbd03.config.Roles;
import pl.lodz.p.it.ssbd2023.ssbd03.entities.MonthPayoff;

import java.util.List;

@Stateless
@TransactionAttribute(TransactionAttributeType.MANDATORY)
public class MonthPayoffFacade extends AbstractFacade<MonthPayoff> {
    @PersistenceContext(unitName = "ssbd03mowPU")
    private EntityManager em;

    public MonthPayoffFacade() {
        super(MonthPayoff.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    @Override
    @RolesAllowed({Roles.MANAGER})
    public void create(MonthPayoff entity) {
        super.create(entity);
    }

    @PermitAll
    public MonthPayoff findWaterHeatingUnitCost() {
        TypedQuery<MonthPayoff> tq = em.createNamedQuery("MonthPayoff.findWaterHeatingUnitCost", MonthPayoff.class);
        List<MonthPayoff> resultList = tq.getResultList();
        return resultList.get(0);
    }

}