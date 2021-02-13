import { 
    animate, group, query, style, transition, trigger 
} from "@angular/animations";

export const slideAnimation =
    trigger(
        'slide',
        [
            transition(
                'accueil=>inscription',
                [
                    style(
                        {
                            position: 'relative'
                        }
                    ),
                    group(
                        [
                            query(
                                ':leave',
                                [
                                    style(
                                        {
                                            position: 'absolute',
                                            transform: 'translateX(0)'
                                        }
                                    ),
                                    animate(
                                        '0.3s ease-out',
                                        style(
                                            {
                                                position: 'absolute',
                                                top: 0,
                                                transform: 'translateX(100%)'
                                            }
                                        )
                                    )
                                ],
                                {
                                    optional: true
                                }
                            ),
                            query(
                                ':enter',
                                [
                                    style(
                                        {
                                            position: 'absolute',
                                            top: 0,
                                            transform: 'translateX(-100%)'
                                        }
                                    ),
                                    animate(
                                        '0.3s ease-out',
                                        style(
                                            {
                                                position: 'absolute',
                                                top: 0,
                                                transform: 'translateX(0)'
                                            }
                                        )
                                    )
                                ],
                                {
                                    optional: true
                                }
                            )
                        ]
                    )
                ]
            ),
            transition(
                'inscription=>accueil',
                [
                    style(
                        {
                            position: 'relative'
                        }
                    ),
                    group(
                        [
                            query(
                                ':leave',
                                [
                                    style(
                                        {
                                            position: 'absolute',
                                            transform: 'translateX(0)'
                                        }
                                    ),
                                    animate(
                                        '0.3s ease-out',
                                        style(
                                            {
                                                position: 'absolute',
                                                top: 0,
                                                transform: 'translateX(-100%)'
                                            }
                                        )
                                    )
                                ],
                                {
                                    optional: true
                                }
                            ),
                            query(
                                ':enter',
                                [
                                    style(
                                        {
                                            position: 'absolute',
                                            top: 0,
                                            transform: 'translateX(100%)'
                                        }
                                    ),
                                    animate(
                                        '0.3s ease-out',
                                        style(
                                            {
                                                position: 'absolute',
                                                top: 0,
                                                transform: 'translateX(0)'
                                            }
                                        )
                                    )
                                ],
                                {
                                    optional: true
                                }
                            )
                        ]
                    )
                ]
            ),
            transition(
                'accueil=>connection',
                [
                    style(
                        {
                            position: 'relative'
                        }
                    ),
                    group(
                        [
                            query(
                                ':leave',
                                [
                                    style(
                                        {
                                            position: 'absolute',
                                            transform: 'translateX(0)'
                                        }
                                    ),
                                    animate(
                                        '0.3s ease-out',
                                        style(
                                            {
                                                position: 'absolute',
                                                top: 0,
                                                transform: 'translateX(-100%)'
                                            }
                                        )
                                    )
                                ],
                                {
                                    optional: true
                                }
                            ),
                            query(
                                ':enter',
                                [
                                    style(
                                        {
                                            position: 'absolute',
                                            top: 0,
                                            transform: 'translateX(100%)'
                                        }
                                    ),
                                    animate(
                                        '0.3s ease-out',
                                        style(
                                            {
                                                position: 'absolute',
                                                top: 0,
                                                transform: 'translateX(0)'
                                            }
                                        )
                                    )
                                ],
                                {
                                    optional: true
                                }
                            )
                        ]
                    )
                ]
            ),
            transition(
                'connection=>accueil',
                [
                    style(
                        {
                            position: 'relative'
                        }
                    ),
                    group(
                        [
                            query(
                                ':leave',
                                [
                                    style(
                                        {
                                            position: 'absolute',
                                            transform: 'translateX(0)'
                                        }
                                    ),
                                    animate(
                                        '0.3s ease-out',
                                        style(
                                            {
                                                position: 'absolute',
                                                top: 0,
                                                transform: 'translateX(100%)'
                                            }
                                        )
                                    )
                                ],
                                {
                                    optional: true
                                }
                            ),
                            query(
                                ':enter',
                                [
                                    style(
                                        {
                                            position: 'absolute',
                                            top: 0,
                                            transform: 'translateX(-100%)'
                                        }
                                    ),
                                    animate(
                                        '0.3s ease-out',
                                        style(
                                            {
                                                position: 'absolute',
                                                top: 0,
                                                transform: 'translateX(0)'
                                            }
                                        )
                                    )
                                ],
                                {
                                    optional: true
                                }
                            )
                        ]
                    )
                ]
            )
        ]
    )