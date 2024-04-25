import React, { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/monokai.css";
import javascript from "highlight.js/lib/languages/javascript";
import { useRef } from "react";
hljs.registerLanguage("javascript", javascript);

export default function SheetSnippet() {
  const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, []);

  return (
    <pre className="snippetStyle snippetHeight scroll">
      <code className="javascript  innerSnippetHeight scroll" ref={codeRef}>
        {`
        return (
            <>
              {isLoading ? (
                <Container>
                  <Row>
                    <Col className="d-flex justify-content-center">
                      <CustomSpinner />
                    </Col>
                  </Row>
                </Container>
              ) : (
                <>
                  <Container className="" style={{ marginBottom: "100px" }}>
                    <CharacterDetails
                      character={character}
                      background={chaBackground}
                      cClass={chaClass}
                      subclass={chaSubClass}
                    />
        
                    <Row className="border border-3 border-black mt-3 rounded-3 slide-in-bottom">
                      <Col>
                        <Row className="fw-bold">
                          <Col
                            className={
                              sheetSwitch === "STATS"
                                ? "bg-dark text-white  p-2 switchElement cursor "
                                : "bg-silver text-secondary border-end border-2 border-black  switchElement p-2 cursor"
                            }
                            onClick={() => {
                              handleSwitchChange("STATS");
                            }}
                          >
                            STATS
                          </Col>
                          <Col
                            className={
                              sheetSwitch === "FEATURES"
                                ? "bg-dark text-white  p-2 switchElement cursor "
                                : "bg-silver text-secondary   switchElement p-2 cursor"
                            }
                            onClick={() => {
                              handleSwitchChange("FEATURES");
                            }}
                          >
                            FEATURES
                          </Col>
                          <Col
                            className={
                              sheetSwitch === "SPELLS"
                                ? "bg-dark text-white  p-2 switchElement cursor "
                                : "bg-silver text-secondary border-start border-2 border-black switchElement p-2 cursor"
                            }
                            onClick={() => {
                              handleSwitchChange("SPELLS");
                            }}
                          >
                            SPELLS
                          </Col>
                        </Row>
                        {sheetSwitch === "FEATURES" && (
                          <>
                            <Row className={prevState === "SPELLS" ? "slide-in-left bg-white" : "slide-in-right bg-white"}>
                              <Col>
                                <Row className="p-1 row-cols-1 row-cols-lg-2 gx-5 gy-2 mt-3">
                                  <Col>
                                    <BackgroundFeature background={chaBackground} />
                                  </Col>
                                  {chaRaceTraits.length > 0 && (
                                    <Col>
                                      <RaceFeatures race={chaRaceTraits} subrace={chaSubRaceTraits} character={character} />
                                    </Col>
                                  )}
                                  <Col>
                                    <ClassFeatures
                                      title={'{chaClass.name.toUpperCase()} FEATURES'}
                                      className={chaClass}
                                      features={chaLevelsFeatures}
                                      level={character.Lv}
                                      fightingstyle={fightingStyle}
                                      character={character}
                                    />
                                  </Col>
                                  {subClassLevelsFeatures[0].level <= character.Lv && (
                                    <Col>
                                      <ClassFeatures
                                        title={'{chaSubClass.name.toUpperCase()} FEATURES'}
                                        className={chaClass}
                                        features={subClassLevelsFeatures}
                                        level={character.Lv}
                                      />
                                    </Col>
                                  )}
                                </Row>
                              </Col>
                            </Row>
                          </>
                        )}
        
                        {sheetSwitch === "STATS" && (
                          <>
                            <Row className="p-1 slide-in-left bg-white">
                              <Col className="">
                                <CharacterAbilities character={character} />
                                <Row className="row-cols-1 row-cols-md-2 mt-3">
                                  <Col>
                                    <Skills character={character} />
                                  </Col>
                                  <Col>
                                    <Row>
                                      <Col>
                                        <ArmorClass
                                          handlechange={handleCharacterSpecificsChange}
                                          characterspecifics={characterSpecifics}
                                          modify={modifyMod}
                                          character={character}
                                        />
                                      </Col>
                                    </Row>
                                    <Row className="p-2">
                                      <Col>
                                        <HitPoints classObj={chaClass} character={character} />
                                      </Col>
                                    </Row>
                                    <Row className="p-2">
                                      <Col>
                                        <DeathSaves />
                                      </Col>
                                    </Row>
                                    <Row className="p-2">
                                      <Col>
                                        <Attacks
                                          handlechange={handleCharacterSpecificsChange}
                                          characterspecifics={characterSpecifics}
                                          modify={modifyMod}
                                          classObj={chaClass}
                                          character={character}
                                        />
                                      </Col>
                                    </Row>
                                    <Row className="p-2">
                                      <Col>
                                        <Spells
                                          handlechange={handleCharacterSpecificsChange}
                                          characterspecifics={characterSpecifics}
                                          modify={modifyMod}
                                          classObj={chaClass}
                                          character={character}
                                        />
                                      </Col>
                                    </Row>
                                    <Row className="mt-5">
                                      <Col>
                                        <EditControls
                                          sendmod={sendCharacterSpecifics}
                                          modify={modifyMod}
                                          setmodify={setModifyMode}
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </>
                        )}
        
                        {sheetSwitch === "SPELLS" && (
                          <>
                            {spells != null && (
                              <Row className="slide-in-right bg-white">
                                <Col>
                                  <SpellSlotsTable spellslevels={levelsForSpells} />
                                  <SpellsList spells={spells} />
                                </Col>
                              </Row>
                            )}
                          </>
                        )}
                      </Col>
                    </Row>
                    <button
                      type="button"
                      className="charactersButton"
                      onClick={() => {
                        navigate("/Characters");
                      }}
                    >
                      Characters
                      <img src="\images\quill.png" alt="d20" className="diceIconHome" />
                    </button>
                  </Container>
                  <CustomResults />
                  <DiceSideMenu />
                </>
              )}
            </>
          );
        `}
      </code>
    </pre>
  );
}
