package pl.lodz.p.it.ssbd2023.ssbd03.mok.facade;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import pl.lodz.p.it.ssbd2023.ssbd03.config.AbstractFacade;
import pl.lodz.p.it.ssbd2023.ssbd03.mok.Account;

@Stateless
public class AccountFacade extends AbstractFacade<Account> {
    @PersistenceContext(unitName = "ssbd03mok")
    private EntityManager em;
    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    public AccountFacade() {
        super(Account.class);
    }
    @Override
    public void edit(Account entity) {
        super.edit(entity);
    }
    @Override
    public void create(Account entity) {
            super.create(entity);
    }
    @Override
    public void remove(Account entity) {
        super.remove(entity);
    }
}
