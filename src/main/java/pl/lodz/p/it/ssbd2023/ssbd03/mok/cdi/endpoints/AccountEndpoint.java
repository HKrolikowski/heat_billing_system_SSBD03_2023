package pl.lodz.p.it.ssbd2023.ssbd03.mok.cdi.endpoints;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import pl.lodz.p.it.ssbd2023.ssbd03.dto.request.CreateOwnerDTO;
import pl.lodz.p.it.ssbd2023.ssbd03.dto.response.ErrorResponseDTO;
import pl.lodz.p.it.ssbd2023.ssbd03.mok.ejb.services.AccountService;
import pl.lodz.p.it.ssbd2023.ssbd03.util.converters.AccountConverter;

@Path("accounts")
@RequestScoped
public class AccountEndpoint {
    @Inject
    private AccountService accountService;

    @POST
    @Path("register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response registerOwner(@NotNull @Valid CreateOwnerDTO createOwnerDTO) {
        if (!createOwnerDTO.getPassword().equals(createOwnerDTO.getRepeatedPassword())) {
            ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(
                    "Password does not match",
                    Response.Status.BAD_REQUEST.getStatusCode(),
                    "Passwords not same");
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(errorResponseDTO)
                    .build();
        }
        accountService.createOwner(AccountConverter.createOwnerDTOToOwner(createOwnerDTO), createOwnerDTO.getPhoneNumber());
        return Response.status(Response.Status.CREATED).build();

    }
}
