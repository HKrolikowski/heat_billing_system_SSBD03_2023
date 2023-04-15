package pl.lodz.p.it.ssbd2023.ssbd03.mok.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import pl.lodz.p.it.ssbd2023.ssbd03.mok.entities.AbstractEntity;
import pl.lodz.p.it.ssbd2023.ssbd03.mok.entities.Account;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "login_data")
public class LoginData extends AbstractEntity {
    @Id
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    @Column(name = "login_data")
    private Account id;

    @Setter
    @Column(nullable = false)
    private LocalDateTime lastValidLoginDate;

    @Setter
    @Pattern(regexp = "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")
    @Column(nullable = false, length = 64)
    private String lastValidLogicAddress;

    @Setter
    @Column(nullable = false)
    private LocalDateTime lastInvalidLoginDate;

    @Setter
    @Pattern(regexp = "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")
    @Column(nullable = false, length = 64)
    private String lastInvalidLogicAddress;

    @Setter
    @Min(value = 0)
    @Column(nullable = false, length = 4)
    private int invalidLoginCounter;

}