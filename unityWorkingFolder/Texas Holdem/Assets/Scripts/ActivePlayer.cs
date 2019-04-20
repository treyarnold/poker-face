using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ActivePlayer : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
      Debug.Log(transform.parent.name);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
