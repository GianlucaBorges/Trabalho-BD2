// events?: boolean;
//   spaces?: boolean;
//   eventOcur?: boolean;
//   project?: boolean;
//   agents?: boolean;
//   EventsName?: boolean;
//   EventsId?: boolean;
//   EventsDescription?: boolean;
//   EventsCreateTSP?: boolean;
//   EventsUpdateTSP?: boolean;
//   EventsClasEtaria?: boolean;
//   EventsOwner?: boolean;
//   EventsProject?: boolean;
//   SpacesId?: boolean;
//   SpacesName?: boolean;
//   SpacesDescription?: boolean;
//   SpacesCreateTSP?: boolean;
//   SpacesUpdateTSP?: boolean;
//   SpacesEventOcur?: boolean;
//   SpacesHorarios?: boolean;
//   SpacesTelefone?: boolean;
//   SpacesEmail?: boolean;
//   SpacesChildren?: boolean;
//   SpacesTerms?: boolean;
//   SpacesParent?: boolean;
//   SpacesOwner?: boolean;
//   EventOcurId?: boolean;
//   EventOcurStartsOn?: boolean;
//   EventOcurStartsAt?: boolean;
//   EventOcurEndsAt?: boolean;
//   EventOcurFrequency?: boolean;
//   EventOcurSeparation?: boolean;
//   EventOcurEvent?: boolean;
//   EventOcurSpace?: boolean;
//   ProjectId?: boolean;
//   ProjectName?: boolean;
//   ProjectDescription?: boolean;
//   ProjectCreateTSP?: boolean;
//   ProjectUpdateTSP?: boolean;
//   ProjectRegistrationFrom?: boolean;
//   ProjectRegistrationTo?: boolean;
//   ProjectParent?: boolean;
//   ProjectChildren?: boolean;
//   ProjectOwner?: boolean;
//   ProjectEvents?: boolean;



    // if (events) {
    //   if (spaces) {
    //     if (eventOcur) {
    //       if (project || (project && !EventsProject)) {
    //         // events && spaces && eventOcur && project || events && spaces && !eventOcur && project
    //         queryBuilder = queryBuilder.addFrom(Events, "events");
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Event_occurrences",
    //           "event_ocur",
    //           "events.id = event_ocur.event"
    //         );
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Spaces",
    //           "spaces",
    //           "spaces.id = event_ocur.space"
    //         );
    //         queryBuilder = queryBuilder.leftJoin(
    //           "Projects",
    //           "projects",
    //           "projects.id = events.project"
    //         );
    //       } else {
    //         // events && spaces && eventOcur && !project
    //         queryBuilder = queryBuilder.addFrom(Events, "events");
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Event_occurrences",
    //           "event_ocur",
    //           "events.id = event_ocur.event"
    //         );
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Spaces",
    //           "spaces",
    //           "spaces.id = event_ocur.space"
    //         );
    //       }
    //     } else {
    //       if (project) {
    //         // events && spaces && !eventOcur && project
    //         queryBuilder = queryBuilder.addFrom(Events, "events");
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Event_occurrences",
    //           "event_ocur",
    //           "events.id = event_ocur.event"
    //         );
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Spaces",
    //           "spaces",
    //           "spaces.id = event_ocur.space"
    //         );
    //         queryBuilder = queryBuilder.leftJoin(
    //           "Projects",
    //           "projects",
    //           "projects.id = events.project"
    //         );
    //       } else {
    //         // events && spaces && !eventOcur && !project
    //         queryBuilder = queryBuilder.addFrom(Events, "events");
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Event_occurrences",
    //           "event_ocur",
    //           "events.id = event_ocur.event"
    //         );
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Spaces",
    //           "spaces",
    //           "spaces.id = event_ocur.space"
    //         );
    //       }
    //     }
    //   } else {
    //     if (eventOcur) {
    //       if (project) {
    //         // events && !spaces && eventOcur && project
    //         queryBuilder = queryBuilder.addFrom(Events, "events");
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Event_occurrences",
    //           "event_ocur",
    //           "events.id = event_ocur.event"
    //         );
    //         queryBuilder = queryBuilder.leftJoin(
    //           "Projects",
    //           "projects",
    //           "projects.id = events.project"
    //         );
    //       } else {
    //         // events && !spaces && eventOcur && !project
    //         queryBuilder = queryBuilder.addFrom(Events, "events");
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Event_occurrences",
    //           "event_ocur",
    //           "events.id = event_ocur.event"
    //         );
    //       }
    //     } else {
    //       if (project) {
    //         // events && !spaces && !eventOcur && project
    //         queryBuilder = queryBuilder.addFrom(Events, "events");
    //         queryBuilder = queryBuilder.leftJoin(
    //           "Projects",
    //           "projects",
    //           "projects.id = events.project"
    //         );
    //       } else {
    //         // events && !spaces && !eventOcur && !project
    //         queryBuilder = queryBuilder.addFrom(Events, "events");
    //       }
    //     }
    //   }
    // } else {
    //   if (spaces) {
    //     if (eventOcur) {
    //       if (project) {
    //         // !events && spaces && eventOcur && project
    //         queryBuilder = queryBuilder.addFrom(Spaces, "spaces");
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Event_occurrences",
    //           "event_ocur",
    //           "spaces.id = event_ocur.space"
    //         );
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Events",
    //           "events",
    //           "events.id = event_ocur.event"
    //         );
    //         queryBuilder = queryBuilder.leftJoin(
    //           "Projects",
    //           "projects",
    //           "projects.id = events.project"
    //         );
    //       } else {
    //         // !events && spaces && eventOcur && !project
    //         queryBuilder = queryBuilder.addFrom(Spaces, "spaces");
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Event_occurrences",
    //           "event_ocur",
    //           "spaces.id = event_ocur.space"
    //         );
    //       }
    //     } else {
    //       if (project) {
    //         // !events && spaces && !eventOcur && project
    //         queryBuilder = queryBuilder.addFrom(Spaces, "spaces");
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Events_occurrences",
    //           "event_ocur",
    //           "spaces.id = event_ocur.space"
    //         );
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Events",
    //           "events",
    //           "events.id = spaces.event"
    //         );
    //         queryBuilder = queryBuilder.leftJoin(
    //           "Projects",
    //           "projects",
    //           "projects.id = events.project"
    //         );
    //       } else {
    //         // !events && spaces && !eventOcur && !project
    //         queryBuilder = queryBuilder.addFrom(Spaces, "spaces");
    //       }
    //     }
    //   } else {
    //     if (eventOcur) {
    //       if (project) {
    //         // !events && !spaces && eventOcur && project
    //         queryBuilder = queryBuilder.addFrom(
    //           Event_occurrences,
    //           "event_ocur"
    //         );
    //         queryBuilder = queryBuilder.innerJoin(
    //           "Events",
    //           "events",
    //           "events.id = event_ocur.event"
    //         );
    //         queryBuilder = queryBuilder.leftJoin(
    //           "Projects",
    //           "projects",
    //           "projects.id = events.project"
    //         );
    //       } else {
    //         // !events && !spaces && eventOcur && !project
    //         queryBuilder = queryBuilder.addFrom(
    //           Event_occurrences,
    //           "event_ocur"
    //         );
    //       }
    //     } else {
    //       if (project) {
    //         // !events && !spaces && !eventOcur && project
    //         queryBuilder = queryBuilder.addFrom(Projects, "projects");
    //       }
    //     }
    //   }
    // }