package pl.lodz.p.it.ssbd2023.ssbd03.mok.ejb.services;

import jakarta.ejb.Local;
import pl.lodz.p.it.ssbd2023.ssbd03.entities.PersonalData;

@Local
public interface AccountService {
    void createOwner(PersonalData account, String phoneNumber);
}
